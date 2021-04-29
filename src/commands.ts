export interface Subcommand {
  readonly title: string;
  readonly file: string;
  readonly subcommands?: Subcommand[];
};

export interface Command extends Subcommand {
  readonly category?: string;
};

export const commands: Command[] = [
  {
    "title": "Help",
    "category": "Help",
    "file": "help"
  },
  // {
  //   "title": "Commands",
  //   "category": "Help",
  //   "file": "commands",
  //   "subcommands": [
  //     {
  //       "title": "Compressed",
  //       "file": "compressed"
  //     }
  //   ]
  // },
  {
    "title": "Tip",
    "category": "Help",
    "file": "tip"
  },
  // {
  //   "title": "Start Game",
  //   "category": "Game",
  //   "file": "start-game"
  // }
];