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

const renderTestName = testName => {
  const div = document.createElement("div");
  div.innerText = testName;
  document.body.appendChild(div);
  return div;
};

const makeRed = node => {
  node.style.color = "red";
};

const makeGreen = node => {
  node.style.color = "green";
};

const test = async (testName, fn) => {
  const testNode = renderTestName(testName);
  makeRed(testNode);
  console.log(testName);
  await fn();
  makeGreen(testNode);
};

export default test;
