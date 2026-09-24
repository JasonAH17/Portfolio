export type EducationEntry = {
  institution: string;
  program: string;
  dates: string;
  description: string;
};

export type Profile = {
  name: string;
  role: string;
  university: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  huggingface: string;
  headshot: { src: string; width: number; height: number };
  about: string;
  education: EducationEntry[];
  skills: string[];
  coreStrengths: string[];
  languages: string[];
};

export const profile: Profile = {
  name: "Jason Alexander Harris",
  role: "Computer Science Student, AI Major",
  university: "Bina Nusantara University",
  location: "Indonesia",
  email: "jsn.a.harris@gmail.com",
  phone: "+62 813-1199-0526",
  linkedin: "https://linkedin.com/in/jasonalxharris",
  github: "https://github.com/JasonAH17",
  huggingface: "https://huggingface.co/JAH17",
  headshot: { src: "/images/profile/headshot.jpg", width: 800, height: 800 },
  about:
    "I am a Computer Science student majoring in Artificial Intelligence at Bina Nusantara University with a passion for creating technology that makes a positive impact. I enjoy learning new things, collaborating with diverse teams, and exploring innovative ideas to address real-world challenges. Through academic and volunteer experiences, I have developed strong communication, teamwork, and problem solving skills while always striving to help others whenever I can contribute.",
  education: [
    {
      institution: "Bina Nusantara University",
      program: "Bachelor of Computer Science, Major in Artificial Intelligence",
      dates: "2024 — Present (Expected 2028)",
      description:
        "Developing analytical thinking, problem solving, and collaboration skills through academic experiences while exploring AI driven solutions to real world challenges.",
    },
    {
      institution: "SMAS Santa Ursula BSD",
      program: "Senior High School Diploma, Natural Sciences Program",
      dates: "Jul 2021 — Apr 2024",
      description:
        "Built a strong foundation in mathematics, science, and critical thinking.",
    },
  ],
  skills: [
    "Python",
    "SQL",
    "C",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing (NLP)",
  ],
  coreStrengths: ["Dependability", "Empathy", "Willingness to Learn"],
  languages: ["Bahasa Indonesia (Native)", "English"],
};
