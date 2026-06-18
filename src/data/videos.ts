export interface Video {
  id: string;
  title: string;
  description: string;
  category: 'ai-videos' | 'football-clips';
  duration: string;
  thumbnail_url: string;
  preview_url: string;
  download_url: string;
  viral_style: string;
  views_badge: string;
}

export const VIDEOS: Video[] = [
  // AI Videos (Folder Ref: 1hkZnvwmnJYyA9RP_yiQeDjHvVJ8q3toP)
  {
    id: "ai-samurai",
    title: "The Cyberpunk Samurai: 4K Neon Cinematic Edit",
    description: "An ultra-premium, high-retention AI loop combining deep synthwave beats with heavy samurai VFX transitions. Crafted with Midjourney v6 and Runway Gen-3.",
    category: "ai-videos",
    duration: "0:25",
    thumbnail_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-cyber-network-background-41662-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1hkZnvwmnJYyA9RP_yiQeDjHvVJ8q3toP/samurai_4k_unlock.zip",
    viral_style: "Neon Glow & High-Impact Cuts",
    views_badge: "4.2M views"
  },
  {
    id: "ai-android",
    title: "Sci-Fi Face Morph: Android Awakening",
    description: "Viral satisfying Morph transition video showing the hyper-realistic assembly of an AI droid. Optimized for YouTube Shorts and TikTok split-screen hooks.",
    category: "ai-videos",
    duration: "0:30",
    thumbnail_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-futuristic-tunnel-with-neon-lights-41982-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1hkZnvwmnJYyA9RP_yiQeDjHvVJ8q3toP/droid_morph_vfx.zip",
    viral_style: "Satisfying Morph & ASMR Synthesizer",
    views_badge: "2.8M views"
  },
  {
    id: "ai-portal",
    title: "Fantasy Realm Portal: Mystic Woods Transitions",
    description: "Stunning cinematic zoom loop traveling from real footage through custom Stable Diffusion XL neural style transfer into a secret fantasy landscape.",
    category: "ai-videos",
    duration: "0:20",
    thumbnail_url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-kaleidoscope-tunnel-of-colorful-digital-artwork-42021-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1hkZnvwmnJYyA9RP_yiQeDjHvVJ8q3toP/magic_portal_assets.zip",
    viral_style: "Parallax Infinite Zoom Loop",
    views_badge: "1.9M views"
  },
  {
    id: "ai-cybercity",
    title: "Tokyo 2099: AI Drone flythrough",
    description: "Sora-style drone camera flythrough of a neon-drenched Tokyo in 2099. Seamlessly loopable with retro-cyberpunk overlays and rain aesthetic.",
    category: "ai-videos",
    duration: "0:15",
    thumbnail_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-server-room-rack-in-clouds-of-colored-smoke-41977-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1hkZnvwmnJYyA9RP_yiQeDjHvVJ8q3toP/tokyo_2099_loop.mp4",
    viral_style: "Lofi Cyberpunk & Rain Overlays",
    views_badge: "5.1M views"
  },
  {
    id: "ai-avatar-faceless",
    title: "AI Dark Storytelling: Secrets of the Cosmos",
    description: "Perfect blueprint template for profitable faceless channels. Heavy dark atmosphere, captions, dynamic AI animations and space narration guides.",
    category: "ai-videos",
    duration: "0:50",
    thumbnail_url: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-galaxy-background-with-stardust-and-clouds-42037-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1hkZnvwmnJYyA9RP_yiQeDjHvVJ8q3toP/dark_cosmos_faceless.zip",
    viral_style: "Retentive Subtitles & Cinematic Drums",
    views_badge: "3.4M views"
  },

  // Football Clips (Folder Ref: 1OZ08VvxBPdlk9pBdmPMI2rEITr-3TLsf)
  {
    id: "fb-joga-bonito",
    title: "Ronaldinho - Ultimate Street Samba Magic",
    description: "High-frame-rate raw street skills compilation of Ronaldinho Gaúcho. Color-graded specifically for TikTok edit overlays with speed ramp cues.",
    category: "football-clips",
    duration: "0:45",
    thumbnail_url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-male-soccer-player-kicking-the-ball-in-the-grass-36369-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1OZ08VvxBPdlk9pBdmPMI2rEITr-3TLsf/ronaldinho_samba_magic.zip",
    viral_style: "Joga Bonito Nostalgia & Bass Drop",
    views_badge: "12.4M views"
  },
  {
    id: "fb-haaland-beast",
    title: "Erling Haaland - Vertical Berserker Power Finish",
    description: "Perfect vertical-angle multi-cam zoom edit of Erling Haaland's most powerful strikes. Includes sound-designed crowd raw chants and net sounds.",
    category: "football-clips",
    duration: "0:30",
    thumbnail_url: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-stretching-on-the-grass-36368-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1OZ08VvxBPdlk9pBdmPMI2rEITr-3TLsf/haaland_berserker_strike.zip",
    viral_style: "Raw Netsound & Velocity Ramps",
    views_badge: "8.9M views"
  },
  {
    id: "fb-neymar-skills",
    title: "Neymar Jr - Brazilian Samba Dribble Masterclass",
    description: "Unreleased vertical footage of Neymar's iconic Santos and Barcelona skill moves. Retuned with high BPM phonk audios for maximum short retention.",
    category: "football-clips",
    duration: "0:40",
    thumbnail_url: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-young-man-playing-soccer-in-the-street-34298-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1OZ08VvxBPdlk9pBdmPMI2rEITr-3TLsf/neymar_samba_phonk_edit.zip",
    viral_style: "Phonk Audio & Brazilian Ramping",
    views_badge: "15.1M views"
  },
  {
    id: "fb-messi-solo",
    title: "Lionel Messi - The Physics Defying Solo Runs",
    description: "Stunning slow-motion edits analyzing how Lionel Messi walks past elite defenders. Complete with geometric trajectory lines tracking space and ball control.",
    category: "football-clips",
    duration: "0:55",
    thumbnail_url: "https://images.unsplash.com/photo-1431324155629-1a6edd1dec1d?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-kicking-a-soccer-ball-close-up-34293-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1OZ08VvxBPdlk9pBdmPMI2rEITr-3TLsf/messi_solo_physics.zip",
    viral_style: "Interactive Trajectory Analysis & Lofi Beats",
    views_badge: "22.3M views"
  },
  {
    id: "fb-cr7-air",
    title: "Cristiano Ronaldo - Gravity-Defying Aerial Headers",
    description: "Vertical tracking camera focusing purely on Cristiano Ronaldo's supernatural vertical leap heights. Ideal template for motivation/mindset shorts edit.",
    category: "football-clips",
    duration: "0:35",
    thumbnail_url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80",
    preview_url: "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-making-a-dribble-34289-large.mp4",
    download_url: "https://drive.google.com/drive/folders/1OZ08VvxBPdlk9pBdmPMI2rEITr-3TLsf/cr7_aerial_leap.zip",
    viral_style: "Motivational Voiceovers & Heartbeat Drop",
    views_badge: "19.7M views"
  }
];
