import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import { FaYoutube, FaFacebook } from "react-icons/fa6";

export default function Social_Media() {
    return (
        <div className="flex justify-center gap-8">
            <a
                href="https://www.instagram.com/kartenspielrichi/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full bg-white hover:bg-pink-100 shadow p-3 transition-colors"
            >
                <FaInstagram className="text-pink-500 w-8 h-8" />
            </a>
            <a
                href="https://www.youtube.com/@kartenspielrichi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="rounded-full bg-white hover:bg-red-100 shadow p-3 transition-colors"
            >
                <FaYoutube className="text-red-600 w-8 h-8" />
            </a>
            <a
                href="https://www.tiktok.com/@kartenspielrichi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="rounded-full bg-white hover:bg-gray-100 shadow p-3 transition-colors"
            >
                <FaTiktok className="text-black w-8 h-8" />
            </a>
            <a
                href="https://www.facebook.com/profile.php?id=61577257205867&sk=about"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-white hover:bg-blue-100 shadow p-3 transition-colors"
            >
                <FaFacebook className="text-blue-600 w-8 h-8" />
            </a>
        </div>
    );
}