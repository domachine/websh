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

import Runtime from "../core/Runtime.js";

const iframeDriver = iframe => {
  return (payload, command) =>
    new Promise((resolve, reject) => {
      const runtime = new Runtime();
      runtime.onerror = reject;
      runtime.onload = resolve;
      window.onmessage = e => {
        if (e.source !== iframe.contentWindow) return;
        runtime.handleMessage(e.data);
      };
      iframe.src = command;
      iframe.onload = () => {
        iframe.contentWindow.postMessage(["stdin", payload], "*");
      };
    });
};

export default iframeDriver;