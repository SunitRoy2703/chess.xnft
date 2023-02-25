type AppBuildJson = {
  kind: "app";
  name: "chess.xnft"; // 32 character limit for seed constraints
  version: "1.0.0"; // Semantic version of the xNFT
  description: "AI chess game on Backpack";
  website: "https://chess-xnft.vercel.app";
  installAuthority?: "8sdbv7oUhfC8ck3UFcTYSYHJ9TpAxLNX4XZ3ZhqD2EcB"; // Base-58 public key
  installVault?: "8sdbv7oUhfC8ck3UFcTYSYHJ9TpAxLNX4XZ3ZhqD2EcB"; // Base-58 public key
  price?: 0; // Installation price in SOL
  supply?: number; // Number of installations to allow (unset/undefined is infinite)
  tag?: "game"; // Defaults to 'none'
  royaltiesPercentage?: number;
  programIds?: string[]; // List of program public keys that are used
  props?: any;
  entrypoints: {
    // Relative paths to the platform's code entrypoint files
    default: {
      android?: string;
      ios?: string;
      web?: "./web-build/index.html";
    };
    [entry: string]: {
      android?: string;
      ios?: string;
      web?: string;
    };
  };
  icon: {
    // Relative paths to the asset file
    sm?: string;
    md?: string;
    lg?: string;
  };
  screenshots?: string[]; // Relative paths to asset files
  splash?: {
    src: string; // Relative path to asset file
    height: number;
    width: number;
  }[];
};