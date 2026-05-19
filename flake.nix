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
      in
      {
        # devShells.default = pkgs.mkShell {
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
