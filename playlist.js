"use client";
import { useState } from 'react';
document.addEventListener("DOMContentLoaded", function() {
    const songs = [
        {title: "newjeans - eta", file: "./assets/newjeans-eta"},
        {title: "newjeans - omg", file: "./assets/newjeans-omg"}
    ]
})

let currentSong = "";
let currentTime = "";
let [ state, setState ]= useState(null);