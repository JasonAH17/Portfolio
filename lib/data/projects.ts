export type ImageAsset = { src: string; width: number; height: number; caption?: string };

export type PipelineStep = { title: string; detail: string };

export type Feature = { title: string; detail: string };

export type Dataset = {
  name: string;
  /** Short label/value facts shown as a spec list. */
  facts: [label: string, value: string][];
  paragraphs: string[];
};

export type ChannelColor = "ecg" | "pleth" | "resp" | "nbp" | "aux";


export type ProjectLink = { label: string; href: string };

export type ImpactSegment = string | { stat: string };
export type ImpactBullet = ImpactSegment[];

export type Project = {
  slug: string;
  tier?: "primary" | "secondary";
  badge?: string;
  /** Accent colour for the project's labels. */
  accent: ChannelColor;
  /** Plain-language field, e.g. "Healthcare AI · Time series". */
  category: string;
  /** Short project type for cards, e.g. "Group project". */
  kind: string;
  /** Which gallery image to use as the card thumbnail (defaults to the cover, then the first screenshot). */
  thumbSrc?: string;
  /** CSS object-position for the thumbnail crop, e.g. "50% 70%" to keep a subject in frame. */
  thumbFocus?: string;
  /** Team name, shown in the case-study meta strip. */
  team?: string;
  /** Paragraphs after `problem` that give the wider background. */
  background?: string[];
  /** Paragraphs after `solution` that explain how the app addresses the problem. */
  solutionDetail?: string[];
  features?: Feature[];
  dataset?: Dataset;
  /** Ordered process (a sequence, so numbered steps are fine here). */
  pipeline?: PipelineStep[];
  /** Heading for the pipeline block; defaults to "How it works". */
  pipelineLabel?: string;
  stack?: string[];
  /** Heading for the stack block; defaults to "Tech stack". */
  stackLabel?: string;
  references?: string[];
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
  whatILearned: string[];
};

export const projects: Project[] = [
  {
    slug: "sepsis-guard",
    tier: "primary",
    badge: "International AI Hackathon · Grand Finalist",
    accent: "ecg",
    category: "Healthcare AI · Time series",
    kind: "Hackathon project · Team of 4",
    team: "ORCA Pura Pura Ninja · BINUS (4 members)",
    title: "Sepsis Guard",
    tagline: "Early Sepsis Detection with Explainable AI",
    cover: {
      src: "/images/projects/sepsis-guard/cover.jpg",
      width: 1600,
      height: 900,
      caption:
        "Individual Diagnostic Deep-Dive: organ-system map, 6-hour sepsis probability, SOFA component scores and clinical alerts.",
    },
    gallery: [
      {
        src: "/images/projects/sepsis-guard/dashboard-1.jpg",
        width: 1600,
        height: 683,
        caption:
          "Patient Triage & Surveillance: ICU patients ranked by sepsis risk, with status and SOFA scores (demo database of 5,657 ICU stays).",
      },
    ],
    pipeline: [
      {
        title: "Dataset",
        detail:
          "MIMIC-IV v3.1 via PhysioNet credentials, queried in BigQuery. Custom SQL keeps only clinically relevant ICU data: vital signs, lab measurements, patient identifiers.",
      },
      {
        title: "Load data",
        detail:
          "Each ICU stay becomes a temporal sequence, with measurements aligned by timestamp into a multivariate time series.",
      },
      {
        title: "Data preparation",
        detail:
          "Forward and backward fill keep each timeline continuous despite 90%+ missing values, without discarding data. Unlike many MIMIC studies that keep only the top features to maximize binary accuracy, the full set of temporal features is preserved, because a variable cut for dimensionality can be the one that signals sepsis onset.",
      },
      {
        title: "GRU-D + Transformer",
        detail:
          "GRU-D models longitudinal dependencies and explicitly accounts for missingness; Transformer attention learns long-range relationships across clinical variables.",
      },
      {
        title: "Feature mapping",
        detail: "Fully connected layers fuse both representations into a compact feature space.",
      },
      {
        title: "Output",
        detail: "An estimated sepsis risk per patient, for continuous monitoring and early warning.",
      },
    ],
    references: [
      "Zhang, D., Yin, C., Hunold, K. M., Jiang, X., Caterino, J. M., & Zhang, P. (2021). An interpretable deep-learning model for early prediction of sepsis in the emergency department. Patterns, 2(2), 100196.",
      "Bomrah, S., Uddin, M., Upadhyay, U., Komorowski, M., Priya, J., Dhar, E., Hsu, S.-C., & Syed-Abdul, S. (2024). A scoping review of machine learning for sepsis prediction: Feature engineering strategies and model performance—A step towards explainability. Critical Care, 28, Article 180.",
    ],
    about:
      "Sepsis Guard is an AI powered early warning system for ICUs that predicts sepsis risk using patient time series data. The platform combines real time patient monitoring, SOFA score visualization, and explainable AI insights to help clinicians prioritize high risk patients and make faster, data driven decisions.",
    problem:
      "In ICU settings, sepsis that isn't caught early is one of the biggest contributors to patient deaths. The challenge is that spotting warning signs means tracking upwards of 134 different clinical measurements at once, something that's nearly impossible to do reliably by hand.",
    solution:
      "We combined GRU-D with a Transformer into one hybrid model, trained on MIMIC-IV v3.1, a large real world ICU time series dataset. To handle the 90%+ missing values, we applied forward and backward fill imputation, letting the model learn physiological decline patterns end to end.",
    year: "February 2026",
    type: "Qualifier Round, International AI in Healthcare Hackathon, Central Asian University, Uzbekistan",
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
    background: [
      "Sepsis is a life-threatening condition caused by a dysregulated immune response to infection. It can progress rapidly to organ failure and death if it isn't treated promptly.",
      "ICU patients are monitored continuously through vital signs and lab measurements such as heart rate, blood pressure, temperature, oxygen saturation and blood biomarkers. Even with all that data, the earliest signs of sepsis are subtle, noisy and spread across many variables, so they are hardest to catch by hand at exactly the stage when intervention works best.",
      "Delayed recognition is strongly associated with higher mortality, and every hour of delay in treatment worsens outcomes. That creates a need for a system that analyzes patient data continuously and raises a warning before deterioration becomes obvious.",
    ],
    solutionDetail: [
      "Machine learning can weigh hundreds of clinical variables at once and pick out trends that are hard for people to see in real time. Sepsis Guard uses that to give clinicians a timely risk estimate for every ICU patient, so attention reaches the right bed earlier.",
      "The model sits behind a dashboard with two views: a ranked triage list for the whole unit, and a diagnostic deep-dive that explains one patient's risk organ by organ.",
    ],
    features: [
      {
        title: "Patient triage & surveillance",
        detail:
          "Every ICU stay ranked by predicted sepsis risk, with a status (Critical, High risk, Moderate, Stable), per-organ SOFA scores, search by patient or stay ID, and a critical-only filter.",
      },
      {
        title: "Unit overview",
        detail:
          "Headline counts for total patients, sepsis cases, normal cases and average age across the 5,657 ICU stays in the demo database.",
      },
      {
        title: "6-hour sepsis probability",
        detail:
          "For a single patient, the predicted probability of sepsis in the next six hours, with SOFA component scores for the cardiovascular, respiratory, coagulation, liver, CNS and renal systems.",
      },
      {
        title: "Interactive organ map",
        detail:
          "A 3D body visualization that places each organ's SOFA score where the organ is, so failing systems stand out at a glance.",
      },
      {
        title: "Clinical alerts",
        detail:
          "Plain-language alerts such as elevated sepsis risk, cardiovascular dysfunction or neurological concern, each with a suggested next step.",
      },
      {
        title: "Update & predict",
        detail:
          "Grouped inputs for vital signs, labs, blood gas, electrolytes, liver function, neurological status (Glasgow Coma Scale) and cardiac markers. Editing them re-runs the model for that patient.",
      },
    ],
    dataset: {
      name: "MIMIC-IV v3.1",
      facts: [
        ["Source", "ICU and emergency admissions, Beth Israel Deaconess Medical Center"],
        ["Access", "Credentialed via PhysioNet, queried in BigQuery"],
        ["Features", "134 vital signs and lab results"],
        ["Missing values", "More than 90%"],
      ],
      paragraphs: [
        "MIMIC-IV is a large, publicly available, de-identified electronic health record resource. The team chose it for its contemporary clinical data, rich ICU time series and modular structure, which make it one of the most widely used benchmarks in critical care research.",
        "Unlike sepsis datasets that offer only static snapshots, MIMIC-IV has high-resolution longitudinal records, so each patient becomes a multivariate time series across their whole ICU stay. Tests are run when they are clinically needed rather than on a fixed schedule, so most values at any time step are missing. That sparsity is how real ICU care works, not a data error.",
        "Handcrafted feature extraction would compress these signals into static summaries and risk losing the early deterioration patterns that matter most. The team kept the original time structure and let the model learn directly from the raw sequences.",
      ],
    },
    stack: ["GRU-D", "Transformer", "MIMIC-IV v3.1", "BigQuery", "SQL", "PhysioNet", "Hugging Face Spaces"],
    whatILearned: [
      "Sepsis Guard was more than just a competition project. It became a turning point in my personal growth. Before this project, I often felt comfortable with my existing abilities and became easily satisfied after completing projects.",
      "Working on a real healthcare problem completely changed that mindset. I realized that AI is much broader and more impactful than I had imagined, and that there is always something new to learn. Being exposed to medical concepts, clinical data, and interdisciplinary collaboration pushed me out of my comfort zone.",
      "Since then, I have become more curious, open minded, and committed to continuously improving my skills. This project taught me that growth happens when we challenge ourselves, and that learning should never stop, no matter how much we already know.",
    ],
  },
  {
    slug: "mindcheck",
    tier: "secondary",
    accent: "resp",
    category: "NLP · Mental health",
    kind: "Group project",
    title: "MindCheck",
    tagline: "AI Powered Mental Health Screening with NLP & Sentence Embeddings",
    cover: {
      src: "/images/projects/mindcheck/cover.jpg",
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: "/images/projects/mindcheck/landing.jpg",
        width: 492,
        height: 411,
        caption: "Landing page: a five-minute screening built on the PHQ-8.",
      },
      {
        src: "/images/projects/mindcheck/screening.jpg",
        width: 502,
        height: 399,
        caption: "Guided conversation: users answer the eight PHQ-8 topics in their own words.",
      },
      {
        src: "/images/projects/mindcheck/results.jpg",
        width: 440,
        height: 401,
        caption: "Screening results: total score, severity category and a score per question.",
      },
      {
        src: "/images/projects/mindcheck/history.jpg",
        width: 462,
        height: 402,
        caption: "Screening history, so users can track results over time.",
      },
    ],
    about:
      "MindCheck is an AI powered mental health screening platform that predicts PHQ-8 depression severity from open ended conversations. Instead of relying on traditional questionnaires, users answer guided questions naturally while the system analyzes linguistic patterns and sentence embeddings to generate objective screening results and personalized recommendations.",
    problem:
      "Depression affects more than 280 million people worldwide, yet access to mental health professionals remains limited. Traditional PHQ-8 assessments rely on checkbox questionnaires that often miss emotional nuances, while clinical interviews are costly, time consuming, and difficult to scale.",
    solution:
      "We developed an NLP based system that predicts PHQ-8 scores directly from free text conversations. The final model combines all-MPNet-base-v2 sentence embeddings with 23 additional linguistic features to capture both what users say and how they express themselves.",
    year: "May 2026",
    type: "Group Project",
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
      [
        "Combined sentence embeddings with ",
        { stat: "23 additional linguistic features" },
        " beyond text semantics",
      ],
      ["Built and deployed an interactive web application for accessible and privacy focused mental health screening"],
    ],
    background: [
      "The PHQ-8 is a standardized eight-question tool for screening depression and measuring its severity. Each question is scored from 0 to 3, giving a total from 0 to 24 that maps to five levels: minimal, mild, moderate, moderately severe and severe.",
      "A checklist is quick, but it only records which box was ticked. How someone talks about their mood, sleep or energy carries information a checkbox can't, and the trained interviewer who could hear it isn't available to most people.",
    ],
    solutionDetail: [
      "Users answer guided questions in their own words, one for each PHQ-8 topic. The model reads the answers and predicts a score for every question (PHQ-1 to PHQ-8), then adds them up into a total and a severity level.",
      "Sentence embeddings capture what the user says. The 23 linguistic features capture how they say it, such as how often they use negative words or filler words. The system runs inside a privacy-focused web app, so screening is available to anyone with a browser.",
    ],
    features: [
      {
        title: "Guided conversation",
        detail:
          "A chat that walks through the eight PHQ-8 topics: loss of interest, feeling depressed, sleep, fatigue, appetite, self-criticism, concentration and psychomotor changes.",
      },
      {
        title: "Score per question",
        detail: "A score for each of the eight questions, so users can see which areas weigh most, not just the total.",
      },
      {
        title: "Severity and next steps",
        detail: "The total out of 24, a severity level, and recommended next steps that match the result.",
      },
      {
        title: "Linguistic signals",
        detail: "Counts of negative words and filler words shown next to the score, making the language side of the model visible.",
      },
      {
        title: "Screening history",
        detail: "Results can be saved and compared over time.",
      },
      {
        title: "Private by design",
        detail:
          "Anonymous and free, with answers not stored on any server. Every result reminds users that MindCheck is a screening aid, not a diagnosis, and points to professional help in an emergency.",
      },
    ],
    dataset: {
      name: "DAIC-WOZ",
      facts: [
        ["Dataset", "DAIC-WOZ clinical interviews"],
        ["Labels", "PHQ-8 scores per participant"],
        ["Model output", "PHQ-1 to PHQ-8, total and severity"],
      ],
      paragraphs: [
        "The Distress Analysis Interview Corpus (Wizard-of-Oz) is a set of clinical interviews in which participants talk with a virtual interviewer. Each participant is labelled with their PHQ-8 scores, so the dataset pairs free conversation with the exact scores MindCheck has to predict.",
      ],
    },
    pipeline: [
      {
        title: "Data",
        detail: "DAIC-WOZ interview transcripts paired with each participant's PHQ-8 scores.",
      },
      {
        title: "Baselines",
        detail: "TF-IDF text features as a traditional starting point to beat.",
      },
      {
        title: "Model comparison",
        detail: "Transformer-based architectures compared against the baselines.",
      },
      {
        title: "Final representation",
        detail: "all-MPNet-base-v2 sentence embeddings combined with 23 linguistic features.",
      },
      {
        title: "Multi-output prediction",
        detail: "The model was fine-tuned to predict all eight question scores, which add up to the total and severity level.",
      },
      {
        title: "Deployment",
        detail: "A privacy-focused web app, hosted on Hugging Face Spaces.",
      },
    ],
    stack: ["DAIC-WOZ", "all-MPNet-base-v2", "Sentence embeddings", "TF-IDF", "NLP", "Hugging Face Spaces"],
    whatILearned: [
      "MindCheck was the first project that genuinely made me proud of how far I had grown. Unlike my previous projects, I no longer felt satisfied once a model was working. Instead, I kept asking myself how much further I could improve it.",
      "This project taught me the importance of iteration and persistence. Rather than settling for the initial results, I continuously experimented, fine tuned, and pushed the model to achieve better performance. It was the first time I truly felt that I was thinking beyond completing a project and started thinking like an AI practitioner.",
      "More importantly, MindCheck showed me how much I had actually grown. It reminded me that meaningful progress comes from curiosity, initiative, and the willingness to keep improving even when something is already considered good enough.",
    ],
  },
  {
    slug: "finansmart",
    accent: "aux",
    category: "Product design · Personal finance",
    kind: "Group project · Ongoing",
    title: "FinanSmart",
    tagline: "AI Powered Personal Finance Assistant for Students & Young Professionals",
    cover: {
      src: "/images/projects/finansmart/cover.jpg",
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: "/images/projects/finansmart/dashboard.jpg",
        width: 633,
        height: 1113,
        caption: "Home dashboard: balance, income and spending, and a 7-day cash-flow chart.",
      },
      {
        src: "/images/projects/finansmart/scan-receipt.jpg",
        width: 625,
        height: 1089,
        caption: "Receipt scanning, which turns a photo of a receipt into a recorded expense.",
      },
    ],
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
    background: [
      "Tracking only shows where money has already gone. Without a look ahead, users find out about a shortfall when it has already happened, instead of while there is still time to adjust.",
      "That gap matters most for Finan Smart's audience: students and fresh graduates who are often budgeting on their own for the first time, and for whom the effort of logging every purchase is the reason they stop.",
    ],
    solutionDetail: [
      "Instead of asking users to type every transaction, the app reads purchases from receipts and sorts them into categories automatically. AI projections then turn that history into a look ahead, so users can see a risk coming rather than discovering it at the end of the month.",
      "Because the AI can misread a receipt or pick the wrong category, nothing it produces is saved without the user's review. That keeps the data accurate and the user in control.",
    ],
    features: [
      {
        title: "Receipt scanning",
        detail: "Point the camera at a receipt and the app reads it into a recorded expense.",
      },
      {
        title: "Automatic categorization",
        detail: "Expenses are sorted into categories without manual tagging.",
      },
      {
        title: "Home dashboard",
        detail: "Main balance, income and spending at a glance, with a 7-day cash-flow chart and recent transactions.",
      },
      {
        title: "AI financial projections",
        detail: "Forecasts of upcoming spending and financial risk, so planning looks forward instead of only back.",
      },
      {
        title: "Human in the loop",
        detail: "Users review and edit anything the AI generated before it is saved.",
      },
      {
        title: "Privacy controls",
        detail: "Settings that keep users in control of their financial data.",
      },
    ],
    pipelineLabel: "Design process",
    pipeline: [
      {
        title: "User research",
        detail: "Surveys and user feedback to validate pain points and rank which features mattered most.",
      },
      {
        title: "User flows",
        detail: "Mapping the key journeys, such as turning a receipt into a saved expense, end to end.",
      },
      {
        title: "Wireframes",
        detail: "Low-fidelity layouts to settle structure and navigation before visual design.",
      },
      {
        title: "High-fidelity interfaces",
        detail: "Final screens for the dashboard, receipt scanner and transaction views.",
      },
      {
        title: "Feature prioritization",
        detail: "Using the research to identify AI projections and automated tracking as candidates for premium features.",
      },
    ],
    stackLabel: "Tools & methods",
    stack: ["UI/UX design", "User research", "Surveys", "User flows", "Wireframing", "High-fidelity design"],
    whatILearned: [
      "Finan Smart gave me the opportunity to step outside my usual role and explore a completely different area. Unlike my previous projects, which were heavily focused on AI modeling, this time I was responsible for designing the application's UI/UX and learning how to think from the user's perspective.",
      "This experience taught me that building a great product is not only about creating intelligent systems, but also about making them intuitive, accessible, and enjoyable to use. I learned to balance functionality with simplicity and realized how small design decisions can significantly influence the overall user experience.",
      "More importantly, Finan Smart reminded me that growth often comes from trying something new. By stepping outside my comfort zone, I was able to broaden my skill set and become a more well rounded AI and product builder rather than focusing solely on model development.",
    ],
  },
  {
    slug: "helmguard-vision",
    accent: "pleth",
    category: "Computer vision · Road safety",
    kind: "Group project",
    thumbSrc: "/images/projects/helmguard/detection.jpg",
    thumbFocus: "50% 72%",
    title: "HelmGuard Vision",
    tagline: "Real-Time Helmet Detection using Deep Learning and Computer Vision",
    cover: {
      src: "/images/projects/helmguard/cover.jpg",
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: "/images/projects/helmguard/detection.jpg",
        width: 606,
        height: 1085,
        caption: "YOLOv8 detection on a real street frame: \"With Helmet\" at 0.89 confidence.",
      },
      {
        src: "/images/projects/helmguard/app.jpg",
        width: 614,
        height: 1040,
        caption: "Streamlit app with image, video and live camera analysis.",
      },
    ],
    about:
      "HelmGuard Vision is a real time safety monitoring application that detects helmet usage from images, videos, and live camera feeds. Built using YOLOv8 and deployed with Streamlit, the system helps automate safety compliance monitoring in traffic and public environments.",
    problem:
      "Monitoring helmet usage manually is inefficient, inconsistent, and difficult to perform at scale. Traditional supervision relies heavily on human observation, making it challenging to continuously enforce safety regulations in real world environments.",
    solution:
      "We developed a YOLOv8 based object detection system trained on 764 curated images to classify riders wearing and not wearing helmets. The model was integrated into an interactive Streamlit application that supports image uploads, video analysis, and real time camera detection.",
    year: "December 2025",
    type: "Group Project",
    role: "Led the end to end AI development process, including dataset preparation, model training, evaluation, and deployment",
    links: [{ label: "GitHub", href: "https://github.com/JasonAH17/HelmGuard-Vision" }],
    impact: [
      ["Developed a real time helmet detection system using YOLOv8 Nano"],
      ["Trained the model on ", { stat: "764 curated images" }, " with diverse traffic scenarios"],
      ["Built an interactive Streamlit application supporting images, videos, and live camera feeds"],
      ["Demonstrated how computer vision can improve safety monitoring in real world environments"],
    ],
    background: [
      "Helmets protect motorcycle riders in a crash, but checking that riders actually wear them still depends on people watching traffic. Human observers can't watch every road all day, and what one observer flags another may miss.",
      "Cameras are already everywhere on the road. What's missing is a system that turns that footage into a consistent, automatic check.",
    ],
    solutionDetail: [
      "The model finds each rider in a frame and labels them as wearing or not wearing a helmet, with a confidence score. YOLOv8 Nano is the smallest and fastest model in the YOLOv8 family, which suits real-time video and live camera feeds.",
      "Wrapping the model in a Streamlit app means anyone can use it from a browser: upload a photo or a video, or point a live camera at the road.",
    ],
    features: [
      {
        title: "Image analysis",
        detail: "Upload a JPG or PNG and get every rider boxed and labelled with a confidence score.",
      },
      {
        title: "Video analysis",
        detail: "Run detection across recorded footage, frame by frame.",
      },
      {
        title: "Live camera",
        detail: "Real-time detection on a camera feed.",
      },
      {
        title: "Confidence scores",
        detail: "Each detection is labelled with a class and confidence, for example \"With Helmet 0.89\".",
      },
    ],
    dataset: {
      name: "Curated helmet dataset",
      facts: [
        ["Images", "764, curated"],
        ["Classes", "With helmet / without helmet"],
        ["Coverage", "Diverse traffic scenarios"],
      ],
      paragraphs: [
        "The training set is 764 curated images of riders, labelled with or without a helmet. Images were chosen to cover diverse traffic scenarios so the model holds up on real streets, not just clean examples.",
      ],
    },
    pipeline: [
      {
        title: "Dataset preparation",
        detail: "Curating and labelling 764 images into the two classes.",
      },
      {
        title: "Training",
        detail: "Training YOLOv8 Nano to detect riders and classify helmet use.",
      },
      {
        title: "Evaluation",
        detail: "Checking how reliably the model finds riders and tells helmet from no helmet.",
      },
      {
        title: "Deployment",
        detail: "A Streamlit app with image, video and live camera modes.",
      },
    ],
    stack: ["YOLOv8 Nano", "Object detection", "Computer vision", "Streamlit"],
    whatILearned: [
      "HelmGuard Vision was my first project that introduced me to Deep Learning and Computer Vision. Before this, most of my projects focused on traditional machine learning, so working with image data and object detection felt like entering a completely new field.",
      "This project taught me that building AI systems goes far beyond training a model. I learned how data quality, preprocessing, and deployment all play an equally important role in creating a reliable real world application. Seeing a model detect objects in real time was also one of the moments that made AI feel much more tangible and exciting to me.",
      "More importantly, this project sparked my interest in exploring more advanced AI domains. It became an important milestone in my journey and gave me the confidence to continue learning and taking on increasingly challenging projects.",
    ],
  },
  {
    slug: "diabetes-prediction",
    accent: "nbp",
    category: "Machine learning · Healthcare",
    kind: "Individual project",
    thumbSrc: "/images/projects/diabetes-prediction/result.jpg",
    title: "Diabetes Prediction",
    tagline: "Early Diabetes Risk Prediction using Machine Learning",
    cover: {
      src: "/images/projects/diabetes-prediction/cover.jpg",
      width: 1600,
      height: 900,
    },
    gallery: [
      {
        src: "/images/projects/diabetes-prediction/inputs.jpg",
        width: 1276,
        height: 654,
        caption: "Patient inputs drawn from BRFSS 2015 health indicators.",
      },
      {
        src: "/images/projects/diabetes-prediction/result.jpg",
        width: 671,
        height: 403,
        caption: "Prediction result with class probabilities and a risk gauge.",
      },
      {
        src: "/images/projects/diabetes-prediction/bmi.jpg",
        width: 660,
        height: 355,
        caption: "Built-in BMI calculator.",
      },
    ],
    about:
      "Diabetes Prediction is a machine learning application that estimates an individual's risk of developing diabetes using health indicators from the BRFSS 2015 dataset. The application combines predictive modeling with an interactive interface, allowing users to assess their risk and visualize prediction probabilities in real time.",
    problem:
      "Diabetes is one of the fastest growing chronic diseases worldwide and can lead to serious complications if left undetected. Early risk assessment is often inaccessible, making it difficult for individuals to identify potential warning signs.",
    solution:
      "I developed a machine learning system using the BRFSS 2015 dataset containing over 250,000 health records. After preprocessing the data, comparing multiple models, and applying hyperparameter tuning, I deployed the final XGBoost model into an interactive Streamlit application for real time diabetes risk prediction.",
    year: "October 2025",
    type: "Individual Project",
    role: "Independently handled the entire project, including data preprocessing, model experimentation, hyperparameter tuning, application development, and deployment",
    links: [
      { label: "GitHub", href: "https://github.com/JasonAH17/Predict_Diabetes_UTSMLOps" },
    ],
    impact: [
      ["Developed an end to end machine learning pipeline from data preprocessing to deployment"],
      ["Compared Random Forest and XGBoost models before selecting the final optimized model"],
      ["Tuned the hyperparameters of the final XGBoost model"],
      ["Built and deployed an interactive web application with risk visualizations and a BMI calculator"],
    ],
    background: [
      "Many of the strongest risk factors are things people can answer about themselves: blood pressure, cholesterol, BMI, physical activity, diet and general health. That makes a quick, self-reported risk check possible without a clinic visit, if there is a model that can turn those answers into a reliable estimate.",
    ],
    solutionDetail: [
      "Users answer a short questionnaire about their health indicators. The model returns the probability of three outcomes (no diabetes, prediabetes and diabetes) and an overall diabetes risk percentage, shown as a chart and a gauge.",
      "XGBoost was chosen over Random Forest after comparing the two, then its hyperparameters were tuned.",
    ],
    features: [
      {
        title: "Health questionnaire",
        detail:
          "Fifteen inputs based on BRFSS indicators, including blood pressure, cholesterol, BMI, smoking, stroke and heart disease history, physical activity, diet, alcohol use, difficulty walking, sex, age group and general health.",
      },
      {
        title: "Three-class prediction",
        detail: "Probabilities for no diabetes, prediabetes and diabetes, shown side by side in a chart.",
      },
      {
        title: "Risk gauge",
        detail: "A single overall diabetes risk percentage that is easy to read at a glance.",
      },
      {
        title: "Input summary",
        detail: "A recap of key answers (age, sex, BMI, general health) before predicting, so users can check what the model sees.",
      },
      {
        title: "BMI calculator",
        detail: "Works out BMI from weight and height for users who don't know theirs.",
      },
    ],
    dataset: {
      name: "BRFSS 2015",
      facts: [
        ["Source", "CDC Behavioral Risk Factor Surveillance System"],
        ["Records", "250,000+ survey responses"],
        ["Outcome", "No diabetes / prediabetes / diabetes"],
      ],
      paragraphs: [
        "The Behavioral Risk Factor Surveillance System is an annual US health survey run by the Centers for Disease Control and Prevention. The 2015 data used here has over 250,000 responses, each pairing health indicators with the respondent's diabetes status.",
      ],
    },
    pipeline: [
      {
        title: "Data",
        detail: "BRFSS 2015 health indicators, over 250,000 records.",
      },
      {
        title: "Preprocessing",
        detail: "Cleaning and preparing the records for modeling.",
      },
      {
        title: "Model comparison",
        detail: "Random Forest and XGBoost trained and compared.",
      },
      {
        title: "Hyperparameter tuning",
        detail: "Tuning the hyperparameters of the chosen XGBoost model.",
      },
      {
        title: "Deployment",
        detail: "A Streamlit app with risk visualizations and a BMI calculator.",
      },
    ],
    stack: ["BRFSS 2015", "XGBoost", "Random Forest", "Hyperparameter tuning", "Streamlit"],
    whatILearned: [
      "Diabetes Prediction was one of the first projects that introduced me to the complete AI development lifecycle. Since it was created in October 2025, long before my later projects, it became the foundation that taught me how different components such as data preprocessing, model training, and deployment come together to build a real application.",
      "More importantly, this project gave me the confidence to explore AI further. Although the application was relatively simple compared to my later projects, it showed me that I genuinely enjoyed solving real world problems with data and building systems that people could actually use.",
      "Looking back, this project reminds me how much I have grown. It represents the starting point of my journey and serves as a benchmark for how my technical skills, problem solving abilities, and project complexity have evolved over time.",
    ],
  },
];
