{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    solc.url = "github:hellwolf/solc.nix";
    foundry.url = "github:shazow/foundry.nix";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      solc,
      foundry,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          system = "x86_64-linux";
          overlays = [
            # Hardhat is potentially more appropriate for Remix interop (haven't really
            # looked into this, however...)
            foundry.overlay
            solc.overlay
          ];
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
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
