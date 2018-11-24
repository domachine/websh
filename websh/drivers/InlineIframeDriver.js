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

import iframeDriver from "./IframeDriver.js";

const createIframe = () => {
  const iframe = document.createElement("iframe");
  const containers = document.querySelectorAll("html, body");
  Array.from(containers).forEach(ct => {
    ct.style.margin = 0;
    ct.style.padding = 0;
  });
  iframe.style.border = "none";
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  document.body.appendChild(iframe);
  return iframe;
};

const inlineIframeDriver = () => iframeDriver(createIframe());

export default inlineIframeDriver;
