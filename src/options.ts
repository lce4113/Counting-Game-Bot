import { PermissionResolvable } from "discord.js";

export type Alias = {
  readonly example: string;
  readonly regex: string;
};

export type Options = {
  readonly example: string;
  readonly description: string;
  readonly permission?: PermissionResolvable;
  readonly regex: string;
  readonly aliases: Alias[];
};