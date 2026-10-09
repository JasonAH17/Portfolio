## Project 1: Sepsis Guard

**Tagline:** Early Sepsis Detection with Explainable AI

**Cover image:** /images/projects/sepsis-guard/cover.jpg
**Cover:** Individual Diagnostic Deep-Dive dashboard (from the team deck)
**Gallery:** /images/projects/sepsis-guard/dashboard-1.jpg (Patient Triage & Surveillance)

**Team:** ORCA Pura Pura Ninja, BINUS (4 members)

**About:** Sepsis Guard is an AI powered early warning system for ICUs that predicts sepsis risk using patient time series data. The platform combines real time patient monitoring, SOFA score visualization, and explainable AI insights to help clinicians prioritize high risk patients and make faster, data driven decisions.

**Problem:** In ICU settings, sepsis that isn't caught early is one of the biggest contributors to patient deaths. The challenge is that spotting warning signs means tracking upwards of 134 different clinical measurements at once, something that's nearly impossible to do reliably by hand.

**Solution:** We combined GRU-D with a Transformer into one hybrid model, trained on MIMIC-IV v3.1, a large real world ICU time series dataset. To handle the 90%+ missing values, we applied forward and backward fill imputation, letting the model learn physiological decline patterns end to end.

- Year accomplished: February 2026
- Type: Group Project (Elimination Round, International AI in Healthcare Hackathon, Central Asian University, Uzbekistan)
- Role: Conducted research, contributed to model development, and participated in training the AI model for early sepsis prediction
- GitHub: https://github.com/Expanics/Sepsis-Prediction
- HuggingFace Space: https://huggingface.co/spaces/Expanic/SEPSIS_ICU_MIMIC

**Impact & Results**
- Developed a hybrid GRU-D + Transformer model using 134 ICU clinical features from MIMIC-IV
- Successfully processed highly sparse medical data with more than 90% missing values
- Built an interactive dashboard for patient surveillance and individual patient analysis
- Deployed a functional web application for early sepsis risk prediction
- Demonstrated how explainable AI can support faster interventions in critical care settings

**Pipeline** (source: team presentation deck)
1. Dataset: MIMIC-IV v3.1 accessed through PhysioNet credentials and queried in BigQuery; custom SQL selects only clinically relevant ICU data (vital signs, lab measurements, patient identifiers).
2. Load data: each ICU stay becomes a temporal sequence, with measurements aligned by timestamp into a multivariate time series.
3. Data preparation: forward and backward fill imputation keeps each patient timeline continuous despite more than 90% missing values, without discarding data or aggressively cutting features.
4. GRU-D + Transformer: GRU-D models longitudinal dependencies and explicitly accounts for missingness; the Transformer's attention learns long-range relationships across clinical variables.
5. Feature mapping: fully connected layers fuse both representations into a compact feature space.
6. Output: an estimated sepsis risk per patient, for continuous monitoring and early warning.

**Training results** (10 epochs; validation loss plateaus between epochs 8 and 10)

| Epoch | Train binary loss | Train regression loss | Val binary loss | Val regression loss |
|---|---|---|---|---|
| 6 | ~0.04 | ~0.24 | ~1.0 | ~0.97 |
| 7 | ~0.03 | ~0.23 | ~0.95 | ~0.96 |
| 8 | ~0.02 | ~0.22 | ~0.93 | ~0.97 |
| 9 | 0.0395 | 0.2527 | 0.9835 | 0.9729 |
| 10 | 0.0358 | 0.2443 | ~0.98 | ~0.97 |

Epochs 1–5: losses fall from high and validation begins to plateau.

**Dashboard views**
- Patient Triage & Surveillance: ranks ICU patients by sepsis risk with a status (Critical, High risk, Moderate, Stable) and SOFA scores; the demo database holds 5,657 ICU stays.
- Individual Diagnostic Deep-Dive: an organ-system map, 6-hour sepsis probability, SOFA component scores, and clinical alerts for one patient.

**References**
- Zhang, D., Yin, C., Hunold, K. M., Jiang, X., Caterino, J. M., & Zhang, P. (2021). An interpretable deep-learning model for early prediction of sepsis in the emergency department. Patterns, 2(2), 100196.
- Bomrah, S., Uddin, M., Upadhyay, U., Komorowski, M., Priya, J., Dhar, E., Hsu, S.-C., & Syed-Abdul, S. (2024). A scoping review of machine learning for sepsis prediction: Feature engineering strategies and model performance—A step towards explainability. Critical Care, 28, Article 180.

<!-- case-study detail: begin -->

**Background (continued)**

Sepsis is a life-threatening condition caused by a dysregulated immune response to infection. It can progress rapidly to organ failure and death if it isn't treated promptly.

ICU patients are monitored continuously through vital signs and lab measurements such as heart rate, blood pressure, temperature, oxygen saturation and blood biomarkers. Even with all that data, the earliest signs of sepsis are subtle, noisy and spread across many variables, so they are hardest to catch by hand at exactly the stage when intervention works best.

Delayed recognition is strongly associated with higher mortality, and every hour of delay in treatment worsens outcomes. That creates a need for a system that analyzes patient data continuously and raises a warning before deterioration becomes obvious.

**Solution (continued)**

Machine learning can weigh hundreds of clinical variables at once and pick out trends that are hard for people to see in real time. Sepsis Guard uses that to give clinicians a timely risk estimate for every ICU patient, so attention reaches the right bed earlier.

The model sits behind a dashboard with two views: a ranked triage list for the whole unit, and a diagnostic deep-dive that explains one patient's risk organ by organ.

**Key features**
- Patient triage & surveillance: Every ICU stay ranked by predicted sepsis risk, with a status (Critical, High risk, Moderate, Stable), per-organ SOFA scores, search by patient or stay ID, and a critical-only filter.
- Unit overview: Headline counts for total patients, sepsis cases, normal cases and average age across the 5,657 ICU stays in the demo database.
- 6-hour sepsis probability: For a single patient, the predicted probability of sepsis in the next six hours, with SOFA component scores for the cardiovascular, respiratory, coagulation, liver, CNS and renal systems.
- Interactive organ map: A 3D body visualization that places each organ's SOFA score where the organ is, so failing systems stand out at a glance.
- Clinical alerts: Plain-language alerts such as elevated sepsis risk, cardiovascular dysfunction or neurological concern, each with a suggested next step.
- Update & predict: Grouped inputs for vital signs, labs, blood gas, electrolytes, liver function, neurological status (Glasgow Coma Scale) and cardiac markers. Editing them re-runs the model for that patient.

**Dataset: MIMIC-IV v3.1**
- Source: ICU and emergency admissions, Beth Israel Deaconess Medical Center
- Access: Credentialed via PhysioNet, queried in BigQuery
- Features: 134 vital signs and lab results
- Missing values: More than 90%

MIMIC-IV is a large, publicly available, de-identified electronic health record resource. The team chose it for its contemporary clinical data, rich ICU time series and modular structure, which make it one of the most widely used benchmarks in critical care research.

Unlike sepsis datasets that offer only static snapshots, MIMIC-IV has high-resolution longitudinal records, so each patient becomes a multivariate time series across their whole ICU stay. Tests are run when they are clinically needed rather than on a fixed schedule, so most values at any time step are missing. That sparsity is how real ICU care works, not a data error.

Handcrafted feature extraction would compress these signals into static summaries and risk losing the early deterioration patterns that matter most. The team kept the original time structure and let the model learn directly from the raw sequences.

**Results, explained**

After 10 epochs, training binary loss fell to 0.0358 and regression loss to 0.2443. Validation losses decreased in the early epochs and plateaued between epochs 8 and 10, which suggests the model balanced learning capacity and generalization without significant overfitting.

The hybrid combines GRU-D's sequential memory with the Transformer's global attention, letting it pick up subtle deterioration trends that come before a clinical sepsis diagnosis. That supports its potential as a decision-support tool for continuous monitoring and earlier intervention.

**Tech stack:** MIMIC-IV v3.1, PhysioNet, BigQuery, SQL, GRU-D, Transformer, Hugging Face Spaces

<!-- case-study detail: end -->
**What I Learned:** Sepsis Guard was more than just a competition project. It became a turning point in my personal growth. Before this project, I often felt comfortable with my existing abilities and became easily satisfied after completing projects.

Working on a real healthcare problem completely changed that mindset. I realized that AI is much broader and more impactful than I had imagined, and that there is always something new to learn. Being exposed to medical concepts, clinical data, and interdisciplinary collaboration pushed me out of my comfort zone.

Since then, I have become more curious, open minded, and committed to continuously improving my skills. This project taught me that growth happens when we challenge ourselves, and that learning should never stop, no matter how much we already know.

---

## Project 2: MindCheck

**Tagline:** AI Powered Mental Health Screening with NLP & Sentence Embeddings

**Cover image:** /images/projects/mindcheck/cover.jpg (not yet)
**Gallery:** landing.jpg, screening.jpg, results.jpg, history.jpg

**About:** MindCheck is an AI powered mental health screening platform that predicts PHQ-8 depression severity from open ended conversations. Instead of relying on traditional questionnaires, users answer guided questions naturally while the system analyzes linguistic patterns and sentence embeddings to generate objective screening results and personalized recommendations.

**Problem:** Depression affects more than 280 million people worldwide, yet access to mental health professionals remains limited. Traditional PHQ-8 assessments rely on checkbox questionnaires that often miss emotional nuances, while clinical interviews are costly, time consuming, and difficult to scale.

**Solution:** We developed an NLP based system that predicts PHQ-8 scores directly from free text conversations. The final model combines all-MPNet-base-v2 sentence embeddings with 23 additional linguistic features to capture both what users say and how they express themselves.

- Year accomplished: May 2026
- Type: Group Project (Class Assignment)
- Role: Contributed to dataset selection, experimented with various NLP models, optimized the final model through fine tuning, and developed a multi output system that predicts PHQ-1 to PHQ-8 scores and overall depression severity
- GitHub: https://github.com/Expanics/MindCheck
- HuggingFace Space: https://huggingface.co/spaces/Expanic/MindCheck

**Impact & Results**
- Developed an NLP based depression screening system using the DAIC-WOZ clinical interview dataset
- Compared multiple approaches, from TF-IDF baselines to transformer based architectures, before selecting the final MPNet based model
- Achieved an MAE of 3.81, outperforming traditional baseline methods
- Enhanced prediction quality by incorporating 23 additional linguistic features beyond text semantics
- Built and deployed an interactive web application for accessible and privacy focused mental health screening

<!-- case-study detail: begin -->

**Background (continued)**

The PHQ-8 is a standardized eight-question tool for screening depression and measuring its severity. Each question is scored from 0 to 3, giving a total from 0 to 24 that maps to five levels: minimal, mild, moderate, moderately severe and severe.

A checklist is quick, but it only records which box was ticked. How someone talks about their mood, sleep or energy carries information a checkbox can't, and the trained interviewer who could hear it isn't available to most people.

**Solution (continued)**

Users answer guided questions in their own words, one for each PHQ-8 topic. The model reads the answers and predicts a score for every question (PHQ-1 to PHQ-8), then adds them up into a total and a severity level.

Sentence embeddings capture what the user says. The 23 linguistic features capture how they say it, such as how often they use negative words or filler words. The system runs inside a privacy-focused web app, so screening is available to anyone with a browser.

**Key features**
- Guided conversation: A chat that walks through the eight PHQ-8 topics: loss of interest, feeling depressed, sleep, fatigue, appetite, self-criticism, concentration and psychomotor changes.
- Score per question: A score for each of the eight questions, so users can see which areas weigh most, not just the total.
- Severity and next steps: The total out of 24, a severity level, and recommended next steps that match the result.
- Linguistic signals: Counts of negative words and filler words shown next to the score, making the language side of the model visible.
- Screening history: Results can be saved and compared over time.
- Private by design: Anonymous and free, with answers not stored on any server. Every result reminds users that MindCheck is a screening aid, not a diagnosis, and points to professional help in an emergency.

**Dataset: DAIC-WOZ**
- Dataset: DAIC-WOZ clinical interviews
- Labels: PHQ-8 scores per participant
- Model output: PHQ-1 to PHQ-8, total and severity

The Distress Analysis Interview Corpus (Wizard-of-Oz) is a set of clinical interviews in which participants talk with a virtual interviewer. Each participant is labelled with their PHQ-8 scores, so the dataset pairs free conversation with the exact scores MindCheck has to predict.

**How it works**
1. Data: DAIC-WOZ interview transcripts paired with each participant's PHQ-8 scores.
2. Baselines: TF-IDF text features as a traditional starting point to beat.
3. Model comparison: Transformer-based architectures compared against the baselines.
4. Final representation: all-MPNet-base-v2 sentence embeddings combined with 23 linguistic features.
5. Multi-output prediction: The model was fine-tuned to predict all eight question scores, which add up to the total and severity level.
6. Deployment: A privacy-focused web app, hosted on Hugging Face Spaces.

**Results, explained**

An MAE of 3.81 means the predicted total lands, on average, within about 3.8 points of the true score on the 0 to 24 PHQ-8 scale.

**Tech stack:** DAIC-WOZ, all-MPNet-base-v2, Sentence embeddings, TF-IDF, NLP, Hugging Face Spaces

<!-- case-study detail: end -->
**What I Learned:** MindCheck was the first project that genuinely made me proud of how far I had grown. Unlike my previous projects, I no longer felt satisfied once a model was working. Instead, I kept asking myself how much further I could improve it.

This project taught me the importance of iteration and persistence. Rather than settling for the initial results, I continuously experimented, fine tuned, and pushed the model to achieve better performance. It was the first time I truly felt that I was thinking beyond completing a project and started thinking like an AI practitioner.

More importantly, MindCheck showed me how much I had actually grown. It reminded me that meaningful progress comes from curiosity, initiative, and the willingness to keep improving even when something is already considered good enough.

---

## Project 3: FinanSmart

**Tagline:** AI Powered Personal Finance Assistant for Students & Young Professionals

**Cover image:** /images/projects/finansmart/cover.jpg (not yet)
**Gallery:** dashboard.jpg, scan-receipt.jpg

**About:** Finan Smart is an AI powered personal finance application designed to simplify budgeting for students and fresh graduates. The app automates expense tracking through receipt scanning, provides AI driven financial projections, and offers privacy focused features to help users build healthier financial habits.

**Problem:** Many people struggle to manage their finances consistently because manually recording every transaction is time consuming and easy to forget. Most finance apps only visualize past spending without helping users anticipate future expenses or financial risks.

**Solution:** We designed Finan Smart to combine AI powered receipt scanning, automatic expense categorization, and financial forecasting. The system also incorporates privacy controls and human in the loop interactions, letting users review and edit AI generated information before saving it.

- Year accomplished: June 2026
- Type: Group Project (Ongoing)
- Role: Designed the end to end UI/UX experience, including user flows, wireframes, and high fidelity interfaces
- GitHub: https://github.com/JasonAH17/FinanSmart
- HuggingFace Space: none yet

**Impact & Results**
- Designed a financial assistant tailored for students and fresh graduates
- Reduced the manual effort required for budgeting through AI powered receipt scanning
- Introduced proactive financial planning instead of only tracking past expenses
- Validated user pain points and feature priorities through surveys and user feedback
- Identified strong demand for AI projections and automated expense tracking as potential premium features

<!-- case-study detail: begin -->

**Background (continued)**

Tracking only shows where money has already gone. Without a look ahead, users find out about a shortfall when it has already happened, instead of while there is still time to adjust.

That gap matters most for Finan Smart's audience: students and fresh graduates who are often budgeting on their own for the first time, and for whom the effort of logging every purchase is the reason they stop.

**Solution (continued)**

Instead of asking users to type every transaction, the app reads purchases from receipts and sorts them into categories automatically. AI projections then turn that history into a look ahead, so users can see a risk coming rather than discovering it at the end of the month.

Because the AI can misread a receipt or pick the wrong category, nothing it produces is saved without the user's review. That keeps the data accurate and the user in control.

**Key features**
- Receipt scanning: Point the camera at a receipt and the app reads it into a recorded expense.
- Automatic categorization: Expenses are sorted into categories without manual tagging.
- Home dashboard: Main balance, income and spending at a glance, with a 7-day cash-flow chart and recent transactions.
- AI financial projections: Forecasts of upcoming spending and financial risk, so planning looks forward instead of only back.
- Human in the loop: Users review and edit anything the AI generated before it is saved.
- Privacy controls: Settings that keep users in control of their financial data.

**Design process**
1. User research: Surveys and user feedback to validate pain points and rank which features mattered most.
2. User flows: Mapping the key journeys, such as turning a receipt into a saved expense, end to end.
3. Wireframes: Low-fidelity layouts to settle structure and navigation before visual design.
4. High-fidelity interfaces: Final screens for the dashboard, receipt scanner and transaction views.
5. Feature prioritization: Using the research to identify AI projections and automated tracking as candidates for premium features.

**Tools & methods:** UI/UX design, User research, Surveys, User flows, Wireframing, High-fidelity design

<!-- case-study detail: end -->
**What I Learned:** Finan Smart gave me the opportunity to step outside my usual role and explore a completely different area. Unlike my previous projects, which were heavily focused on AI modeling, this time I was responsible for designing the application's UI/UX and learning how to think from the user's perspective.

This experience taught me that building a great product is not only about creating intelligent systems, but also about making them intuitive, accessible, and enjoyable to use. I learned to balance functionality with simplicity and realized how small design decisions can significantly influence the overall user experience.

More importantly, Finan Smart reminded me that growth often comes from trying something new. By stepping outside my comfort zone, I was able to broaden my skill set and become a more well rounded AI and product builder rather than focusing solely on model development.

---

## Project 4: HelmGuard Vision

**Tagline:** Real-Time Helmet Detection using Deep Learning and Computer Vision

**Cover image:** /images/projects/helmguard/cover.jpg (not yet)
**Gallery:** detection.jpg, app.jpg

**About:** HelmGuard Vision is a real time safety monitoring application that detects helmet usage from images, videos, and live camera feeds. Built using YOLOv8 and deployed with Streamlit, the system helps automate safety compliance monitoring in traffic and public environments.

**Problem:** Monitoring helmet usage manually is inefficient, inconsistent, and difficult to perform at scale. Traditional supervision relies heavily on human observation, making it challenging to continuously enforce safety regulations in real world environments.

**Solution:** We developed a YOLOv8 based object detection system trained on 764 curated images to classify riders wearing and not wearing helmets. The model was integrated into an interactive Streamlit application that supports image uploads, video analysis, and real time camera detection.

- Year accomplished: December 2025
- Type: Group Project (Class Assignment)
- Role: Led the end to end AI development process, including dataset preparation, model training, evaluation, and deployment
- GitHub: https://github.com/JasonAH17/HelmGuard-Vision
- Demo video: (add your demo link here)

**Impact & Results**
- Developed a real time helmet detection system using YOLOv8 Nano
- Trained the model on 764 curated images with diverse traffic scenarios
- Achieved an 81.1% mAP@50 and 80.0% precision
- Built an interactive Streamlit application supporting images, videos, and live camera feeds
- Demonstrated how computer vision can improve safety monitoring in real world environments

<!-- case-study detail: begin -->

**Background (continued)**

Helmets protect motorcycle riders in a crash, but checking that riders actually wear them still depends on people watching traffic. Human observers can't watch every road all day, and what one observer flags another may miss.

Cameras are already everywhere on the road. What's missing is a system that turns that footage into a consistent, automatic check.

**Solution (continued)**

The model finds each rider in a frame and labels them as wearing or not wearing a helmet, with a confidence score. YOLOv8 Nano is the smallest and fastest model in the YOLOv8 family, which suits real-time video and live camera feeds.

Wrapping the model in a Streamlit app means anyone can use it from a browser: upload a photo or a video, or point a live camera at the road.

**Key features**
- Image analysis: Upload a JPG or PNG and get every rider boxed and labelled with a confidence score.
- Video analysis: Run detection across recorded footage, frame by frame.
- Live camera: Real-time detection on a camera feed.
- Confidence scores: Each detection is labelled with a class and confidence, for example "With Helmet 0.89".

**Dataset: Curated helmet dataset**
- Images: 764, curated
- Classes: With helmet / without helmet
- Coverage: Diverse traffic scenarios

The training set is 764 curated images of riders, labelled with or without a helmet. Images were chosen to cover diverse traffic scenarios so the model holds up on real streets, not just clean examples.

**How it works**
1. Dataset preparation: Curating and labelling 764 images into the two classes.
2. Training: Training YOLOv8 Nano to detect riders and classify helmet use.
3. Evaluation: Measuring mAP@50 and precision to check detection quality.
4. Deployment: A Streamlit app with image, video and live camera modes.

**Results, explained**

mAP@50 counts a detection as correct when its box overlaps the true box by at least 50%, then averages precision across both classes: here, 81.1%. A precision of 80.0% means four in five of the model's detections are correct.

**Tech stack:** YOLOv8 Nano, Object detection, Computer vision, Streamlit

<!-- case-study detail: end -->
**What I Learned:** HelmGuard Vision was my first project that introduced me to Deep Learning and Computer Vision. Before this, most of my projects focused on traditional machine learning, so working with image data and object detection felt like entering a completely new field.

This project taught me that building AI systems goes far beyond training a model. I learned how data quality, preprocessing, and deployment all play an equally important role in creating a reliable real world application. Seeing a model detect objects in real time was also one of the moments that made AI feel much more tangible and exciting to me.

More importantly, this project sparked my interest in exploring more advanced AI domains. It became an important milestone in my journey and gave me the confidence to continue learning and taking on increasingly challenging projects.

---

## Project 5: Diabetes Prediction

**Tagline:** Early Diabetes Risk Prediction using Machine Learning

**Cover image:** /images/projects/diabetes-prediction/cover.jpg (not yet)
**Gallery:** inputs.jpg, result.jpg, bmi.jpg

**About:** Diabetes Prediction is a machine learning application that estimates an individual's risk of developing diabetes using health indicators from the BRFSS 2015 dataset. The application combines predictive modeling with an interactive interface, allowing users to assess their risk and visualize prediction probabilities in real time.

**Problem:** Diabetes is one of the fastest growing chronic diseases worldwide and can lead to serious complications if left undetected. Early risk assessment is often inaccessible, making it difficult for individuals to identify potential warning signs.

**Solution:** I developed a machine learning system using the BRFSS 2015 dataset containing over 250,000 health records. After preprocessing the data, comparing multiple models, and applying hyperparameter tuning, I deployed the final XGBoost model into an interactive Streamlit application for real time diabetes risk prediction.

- Year accomplished: October 2025
- Type: Individual Project (Class Assignment)
- Role: Independently handled the entire project, including data preprocessing, model experimentation, hyperparameter tuning, application development, and deployment
- GitHub: https://github.com/JasonAH17/Predict_Diabetes_UTSMLOps
- Demo video: (add your demo link here)

**Impact & Results**
- Developed an end to end machine learning pipeline from data preprocessing to deployment
- Compared Random Forest and XGBoost models before selecting the final optimized model
- Achieved approximately 85% accuracy after hyperparameter tuning
- Built and deployed an interactive web application with risk visualizations and a BMI calculator

<!-- case-study detail: begin -->

**Background (continued)**

Many of the strongest risk factors are things people can answer about themselves: blood pressure, cholesterol, BMI, physical activity, diet and general health. That makes a quick, self-reported risk check possible without a clinic visit, if there is a model that can turn those answers into a reliable estimate.

**Solution (continued)**

Users answer a short questionnaire about their health indicators. The model returns the probability of three outcomes (no diabetes, prediabetes and diabetes) and an overall diabetes risk percentage, shown as a chart and a gauge.

XGBoost was chosen over Random Forest after comparing the two, then tuned to reach about 85% accuracy.

**Key features**
- Health questionnaire: Fifteen inputs based on BRFSS indicators, including blood pressure, cholesterol, BMI, smoking, stroke and heart disease history, physical activity, diet, alcohol use, difficulty walking, sex, age group and general health.
- Three-class prediction: Probabilities for no diabetes, prediabetes and diabetes, shown side by side in a chart.
- Risk gauge: A single overall diabetes risk percentage that is easy to read at a glance.
- Input summary: A recap of key answers (age, sex, BMI, general health) before predicting, so users can check what the model sees.
- BMI calculator: Works out BMI from weight and height for users who don't know theirs.

**Dataset: BRFSS 2015**
- Source: CDC Behavioral Risk Factor Surveillance System
- Records: 250,000+ survey responses
- Outcome: No diabetes / prediabetes / diabetes

The Behavioral Risk Factor Surveillance System is an annual US health survey run by the Centers for Disease Control and Prevention. The 2015 data used here has over 250,000 responses, each pairing health indicators with the respondent's diabetes status.

**How it works**
1. Data: BRFSS 2015 health indicators, over 250,000 records.
2. Preprocessing: Cleaning and preparing the records for modeling.
3. Model comparison: Random Forest and XGBoost trained and compared.
4. Hyperparameter tuning: Tuning the chosen XGBoost model to about 85% accuracy.
5. Deployment: A Streamlit app with risk visualizations and a BMI calculator.

**Tech stack:** BRFSS 2015, XGBoost, Random Forest, Hyperparameter tuning, Streamlit

<!-- case-study detail: end -->
**What I Learned:** Diabetes Prediction was one of the first projects that introduced me to the complete AI development lifecycle. Since it was created in October 2025, long before my later projects, it became the foundation that taught me how different components such as data preprocessing, model training, and deployment come together to build a real application.

More importantly, this project gave me the confidence to explore AI further. Although the application was relatively simple compared to my later projects, it showed me that I genuinely enjoyed solving real world problems with data and building systems that people could actually use.

Looking back, this project reminds me how much I have grown. It represents the starting point of my journey and serves as a benchmark for how my technical skills, problem solving abilities, and project complexity have evolved over time.
