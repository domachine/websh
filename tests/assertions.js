/*
   websh is a javascript library to compose websites.
   Copyright (C) 2018  Dominik Burgdörfer

   This file is part of websh.

   websh is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   websh is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with websh.  If not, see <https://www.gnu.org/licenses/>.
 */

export const assertCommandsAreEqual = (c0, c1) => {
  if (c0.length !== c1.length)
    throw new Error("AssertionError: invalid length");
  c0.forEach((r, i) => {
    if (JSON.stringify(r) !== JSON.stringify(c1[i]))
      throw new Error(
        "AssertionError: " +
          JSON.stringify(r) +
          " !== " +
          JSON.stringify(c1[i]) +
          ""
      );
  });
};
