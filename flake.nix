{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    solc.url = "github:hellwolf/solc.nix";
    foundry.url = "github:shazow/foundry.nix";
    crane.url = "github:ipetkov/crane";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      solc,
      foundry,
      crane,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          config.allowUnfree = true;
          system = "x86_64-linux";
          overlays = [
            foundry.overlay
            solc.overlay
          ];
        };

        craneLib = crane.mkLib pkgs;
        
        # cannot for the life of me figure out why this is broken
        # but its probably unimportant here...
        client = pkgs.buildNpmPackage {
          pname = "rxchain-client";
          version = "0.0.1";
          src = ./client;

          npmDepsFetcherVersion = 2;
          npmDepsHash = pkgs.lib.fakeHash;

          buildPhase = ''
            npm install 
            npm run build -- --sourcemap

            rm -rf ./node_modules
            npm install --omit dev
          '';

          installPhase = ''
            mkdir -p $out
            cp -R ./node_modules $out/
            cp -R ./build $out/
          '';
        };
      in
      {
        packages = {
          default = client;
        };

        devShells.default = craneLib.devShell {
          buildInputs = with pkgs; [
            pkg-config
            sqlite

            foundry-bin
            (solc.mkDefault pkgs solc_0_8_34)

            jq
            bun
            nodejs
          ];
        };
      }
    );
}
