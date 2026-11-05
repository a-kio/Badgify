import { describe, it, expect } from "vitest";
import { ICONS, generateBadge } from "../src/index";

describe("Authentic Vector Icon Registry", () => {
  it("contains 279 verified high-fidelity icons", () => {
    const keys = Object.keys(ICONS);
    expect(keys.length).toBe(279);
  });

  it("ensures every icon has a valid non-empty SVG path", () => {
    for (const [name, path] of Object.entries(ICONS)) {
      expect(typeof path).toBe("string");
      expect(path.length).toBeGreaterThan(10);
      expect(path.trim().startsWith("M") || path.trim().startsWith("m")).toBe(true);
    }
  });

  it("verifies all 32 anime studio logos are present and valid", () => {
    const studios = [
      "ghibli", "mappa", "kyoani", "ufotable", "witstudio", "madhouse", "bones",
      "cloverworks", "a1pictures", "trigger", "comixwave", "shaft", "productionig",
      "sunrise", "toei", "pierrot", "tms", "davidproduction", "whitefox", "dogakobo",
      "sciencesaru", "paworks", "jcstaff", "studiochizu", "olm", "silverlink",
      "kinemacitrus", "feel", "lerche", "lidenfilms", "colorido", "gainax"
    ];
    for (const s of studios) {
      expect(ICONS[s]).toBeDefined();
      expect(ICONS[s].length).toBeGreaterThan(20);
    }
  });

  it("verifies all major social media icons are present and valid", () => {
    const socials = [
      "twitter", "x", "instagram", "snapchat", "tiktok", "wechat", "discord",
      "youtube", "telegram", "reddit", "twitch", "threads", "bluesky", "mastodon",
      "facebook", "pinterest", "whatsapp", "signal", "medium", "substack",
      "dribbble", "behance", "spotify", "soundcloud", "line", "weibo", "bilibili",
      "zhihu", "xiaohongshu", "linkedin", "qq"
    ];
    for (const s of socials) {
      expect(ICONS[s]).toBeDefined();
      expect(ICONS[s].length).toBeGreaterThan(20);
    }
  });

  it("renders an authentic badge with an anime studio icon and a social icon without error", () => {
    const ghibliBadge = generateBadge({
      style: "solid",
      value: "Studio Ghibli",
      icon: "ghibli",
      color: "#059669"
    });
    expect(ghibliBadge).toContain("<svg");
    expect(ghibliBadge).toContain(ICONS["ghibli"]);

    const xBadge = generateBadge({
      style: "split",
      label: "Twitter",
      value: "@slxwv",
      icon: "x",
      color: "#000000"
    });
    expect(xBadge).toContain("<svg");
    expect(xBadge).toContain(ICONS["x"]);
  });
});
