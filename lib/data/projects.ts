export type ImageAsset = { src: string; width: number; height: number };

export type ProjectLink = { label: string; href: string };

export type ImpactSegment = string | { stat: string };
export type ImpactBullet = ImpactSegment[];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  cover: ImageAsset;
  gallery?: ImageAsset[];
  about: string;
  problem: string;
  solution: string;
  year: string;
  type: string;
  role: string;
  links: ProjectLink[];
  impact: ImpactBullet[];
  whatILearned: string;
};

export const projects: Project[] = [
  {
    slug: "sepsis-guard",
    title: "Sepsis Guard",
    tagline: "Early Sepsis Detection with Explainable AI",
    cover: {
      src: "/images/projects/sepsis-guard/cover.jpg",
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: "/images/projects/sepsis-guard/dashboard-1.jpg",
        width: 800,
        height: 600,
      },
      {
        src: "/images/projects/sepsis-guard/dashboard-2.jpg",
        width: 800,
        height: 600,
      },
    ],
    about:
      "Sepsis Guard is an AI powered early warning system for ICUs that predicts sepsis risk using patient time series data. The platform combines real time patient monitoring, SOFA score visualization, and explainable AI insights to help clinicians prioritize high risk patients and make faster, data driven decisions.",
    problem:
      "In ICU settings, sepsis that isn't caught early is one of the biggest contributors to patient deaths. The challenge is that spotting warning signs means tracking upwards of 134 different clinical measurements at once, something that's nearly impossible to do reliably by hand.",
    solution:
      "We combined GRU-D with a Transformer into one hybrid model, trained on MIMIC-IV v3.1, a large real world ICU time series dataset. To handle the 90%+ missing values, we applied forward and backward fill imputation, letting the model learn physiological decline patterns end to end.",
    year: "February 2026",
    type: "Group Project (Elimination Round, International AI in Healthcare Hackathon, Central Asian University, Uzbekistan)",
    role: "Conducted research, contributed to model development, and participated in training the AI model for early sepsis prediction",
    links: [
      { label: "GitHub", href: "https://github.com/Expanics/Sepsis-Prediction" },
      {
        label: "Hugging Face Space",
        href: "https://huggingface.co/spaces/Expanic/SEPSIS_ICU_MIMIC",
      },
    ],
    impact: [
      [
        "Developed a hybrid GRU-D + Transformer model using ",
        { stat: "134 ICU clinical features" },
        " from MIMIC-IV",
      ],
      [
        "Successfully processed highly sparse medical data with ",
        { stat: "more than 90% missing values" },
      ],
      ["Built an interactive dashboard for patient surveillance and individual patient analysis"],
      ["Deployed a functional web application for early sepsis risk prediction"],
      ["Demonstrated how explainable AI can support faster interventions in critical care settings"],
    ],
    whatILearned:
      "Sepsis Guard was more than just a competition project, it became a turning point in my personal growth. Working on a real healthcare problem changed my mindset about how broad and impactful AI can be, and being exposed to medical concepts and interdisciplinary collaboration pushed me out of my comfort zone. Since then I have become more curious, open minded, and committed to continuously improving my skills.",
  },
  {
    slug: "mindcheck",
    title: "MindCheck",
    tagline: "AI Powered Mental Health Screening with NLP & Sentence Embeddings",
    cover: {
      src: "/images/projects/mindcheck/cover.jpg",
      width: 1600,
      height: 900,
    },
    about:
      "MindCheck is an AI powered mental health screening platform that predicts PHQ-8 depression severity from open ended conversations. Instead of relying on traditional questionnaires, users answer guided questions naturally while the system analyzes linguistic patterns and sentence embeddings to generate objective screening results and personalized recommendations.",
    problem:
      "Depression affects more than 280 million people worldwide, yet access to mental health professionals remains limited. Traditional PHQ-8 assessments rely on checkbox questionnaires that often miss emotional nuances, while clinical interviews are costly, time consuming, and difficult to scale.",
    solution:
      "We developed an NLP based system that predicts PHQ-8 scores directly from free text conversations. The final model combines all-MPNet-base-v2 sentence embeddings with 23 additional linguistic features to capture both what users say and how they express themselves.",
    year: "May 2026",
    type: "Group Project (Class Assignment)",
    role: "Contributed to dataset selection, experimented with various NLP models, optimized the final model through fine tuning, and developed a multi output system that predicts PHQ-1 to PHQ-8 scores and overall depression severity",
    links: [
      { label: "GitHub", href: "https://github.com/Expanics/MindCheck" },
      { label: "Hugging Face Space", href: "https://huggingface.co/spaces/Expanic/MindCheck" },
    ],
    impact: [
      ["Developed an NLP based depression screening system using the DAIC-WOZ clinical interview dataset"],
      [
        "Compared multiple approaches, from TF-IDF baselines to transformer based architectures, before selecting the final MPNet based model",
      ],
      ["Achieved an ", { stat: "MAE of 3.81" }, ", outperforming traditional baseline methods"],
      [
        "Enhanced prediction quality by incorporating ",
        { stat: "23 additional linguistic features" },
        " beyond text semantics",
      ],
      ["Built and deployed an interactive web application for accessible and privacy focused mental health screening"],
    ],
    whatILearned:
      "MindCheck was the first project that genuinely made me proud of how far I had grown. Rather than settling for initial results, I continuously experimented, fine tuned, and pushed the model to achieve better performance. It was the first time I truly felt I was thinking like an AI practitioner rather than just completing a project.",
  },
  {
    slug: "finansmart",
    title: "FinanSmart",
    tagline: "AI Powered Personal Finance Assistant for Students & Young Professionals",
    cover: {
      src: "/images/projects/finansmart/cover.jpg",
      width: 1600,
      height: 900,
    },
    about:
      "Finan Smart is an AI powered personal finance application designed to simplify budgeting for students and fresh graduates. The app automates expense tracking through receipt scanning, provides AI driven financial projections, and offers privacy focused features to help users build healthier financial habits.",
    problem:
      "Many people struggle to manage their finances consistently because manually recording every transaction is time consuming and easy to forget. Most finance apps only visualize past spending without helping users anticipate future expenses or financial risks.",
    solution:
      "We designed Finan Smart to combine AI powered receipt scanning, automatic expense categorization, and financial forecasting. The system also incorporates privacy controls and human in the loop interactions, letting users review and edit AI generated information before saving it.",
    year: "June 2026",
    type: "Group Project (Ongoing)",
    role: "Designed the end to end UI/UX experience, including user flows, wireframes, and high fidelity interfaces",
    links: [{ label: "GitHub", href: "https://github.com/JasonAH17/FinanSmart" }],
    impact: [
      ["Designed a financial assistant tailored for students and fresh graduates"],
      ["Reduced the manual effort required for budgeting through AI powered receipt scanning"],
      ["Introduced proactive financial planning instead of only tracking past expenses"],
      ["Validated user pain points and feature priorities through surveys and user feedback"],
      [
        "Identified strong demand for AI projections and automated expense tracking as potential premium features",
      ],
    ],
    whatILearned:
      "Finan Smart gave me the opportunity to step outside my usual role and explore a completely different area. Unlike my previous projects, which were heavily focused on AI modeling, this time I was responsible for designing the application's UI/UX and learning how to think from the user's perspective. It reminded me that growth often comes from trying something new.",
  },
  {
    slug: "helmguard-vision",
    title: "HelmGuard Vision",
    tagline: "Real-Time Helmet Detection using Deep Learning and Computer Vision",
    cover: {
      src: "/images/projects/helmguard/cover.jpg",
      width: 1600,
      height: 900,
    },
    about:
      "HelmGuard Vision is a real time safety monitoring application that detects helmet usage from images, videos, and live camera feeds. Built using YOLOv8 and deployed with Streamlit, the system helps automate safety compliance monitoring in traffic and public environments.",
    problem:
      "Monitoring helmet usage manually is inefficient, inconsistent, and difficult to perform at scale. Traditional supervision relies heavily on human observation, making it challenging to continuously enforce safety regulations in real world environments.",
    solution:
      "We developed a YOLOv8 based object detection system trained on 764 curated images to classify riders wearing and not wearing helmets. The model was integrated into an interactive Streamlit application that supports image uploads, video analysis, and real time camera detection.",
    year: "December 2025",
    type: "Group Project (Class Assignment)",
    role: "Led the end to end AI development process, including dataset preparation, model training, evaluation, and deployment",
    links: [{ label: "GitHub", href: "https://github.com/JasonAH17/HelmGuard-Vision" }],
    impact: [
      ["Developed a real time helmet detection system using YOLOv8 Nano"],
      ["Trained the model on ", { stat: "764 curated images" }, " with diverse traffic scenarios"],
      ["Achieved an ", { stat: "81.1% mAP@50" }, " and ", { stat: "80.0% precision" }],
      ["Built an interactive Streamlit application supporting images, videos, and live camera feeds"],
      ["Demonstrated how computer vision can improve safety monitoring in real world environments"],
    ],
    whatILearned:
      "HelmGuard Vision was my first project that introduced me to Deep Learning and Computer Vision. It taught me that building AI systems goes far beyond training a model, since data quality, preprocessing, and deployment all play an equally important role. This project sparked my interest in exploring more advanced AI domains.",
  },
  {
    slug: "diabetes-prediction",
    title: "Diabetes Prediction",
    tagline: "Early Diabetes Risk Prediction using Machine Learning",
    cover: {
      src: "/images/projects/diabetes-prediction/cover.jpg",
      width: 1600,
      height: 900,
    },
    about:
      "Diabetes Prediction is a machine learning application that estimates an individual's risk of developing diabetes using health indicators from the BRFSS 2015 dataset. The application combines predictive modeling with an interactive interface, allowing users to assess their risk and visualize prediction probabilities in real time.",
    problem:
      "Diabetes is one of the fastest growing chronic diseases worldwide and can lead to serious complications if left undetected. Early risk assessment is often inaccessible, making it difficult for individuals to identify potential warning signs.",
    solution:
      "I developed a machine learning system using the BRFSS 2015 dataset containing over 250,000 health records. After preprocessing the data, comparing multiple models, and applying hyperparameter tuning, I deployed the final XGBoost model into an interactive Streamlit application for real time diabetes risk prediction.",
    year: "October 2025",
    type: "Individual Project (Class Assignment)",
    role: "Independently handled the entire project, including data preprocessing, model experimentation, hyperparameter tuning, application development, and deployment",
    links: [
      { label: "GitHub", href: "https://github.com/JasonAH17/Predict_Diabetes_UTSMLOps" },
    ],
    impact: [
      ["Developed an end to end machine learning pipeline from data preprocessing to deployment"],
      ["Compared Random Forest and XGBoost models before selecting the final optimized model"],
      ["Achieved approximately ", { stat: "85% accuracy" }, " after hyperparameter tuning"],
      ["Built and deployed an interactive web application with risk visualizations and a BMI calculator"],
    ],
    whatILearned:
      "Diabetes Prediction was one of the first projects that introduced me to the complete AI development lifecycle. It became the foundation that taught me how data preprocessing, model training, and deployment come together to build a real application, and it reminds me how much I've grown since.",
  },
];
