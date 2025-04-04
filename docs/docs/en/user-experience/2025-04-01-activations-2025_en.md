
# ✨ Activations

## 🎯 Purpose and Overview

This document defines and describes the various `activations` (missions/exercises) available within the Inner Journey project. These `activations` represent small, manageable steps on the user's path towards personal and spiritual development.

Through a mix of physical 🤸‍♂️, social 🗣️, meditative 🧘‍♀️, and AI-driven 🤖 exercises, we strive to guide the user on a journey that feels both grounded and meaningful.

All `activations` are designed to integrate smoothly with the application's technical platform and database structure in Google `Firestore` 🔥.

The document presents 18 `activations`, divided into categories such as `inner_child`, `manifest`, `shadows`, `brainsync`, and `sleep`. Each `activation` is specified with the following information:

*   **📌 Title and description:** Formulated to be engaging and easy to understand.
*   **💾 Log type:** Indicates whether logging occurs via `text` 📝, `video` 📹, or `audio` 🎙️, depending on what best captures the experience.
*   **⚙️ Technical specifications:** Clear instructions and requirements for the exercise.
*   **📜 Backlog:** Explains the purpose, motivation, benefits, goals, and area trained for the exercise.

The user logs their experiences via the app's terminal interface:

*   `text` 📝: For reflections, thoughts, and insights.
*   `video` 📹: To document movements or visual aspects of an exercise.
*   `audio` 🎙️: To record spoken reflections or dialogues.

## 📋 Description of Activations

Here follows a detailed description of each `activation`.

### 👀 Eye Contact

*   `activationId`: `eye_contact_001`
*   `title`: "Eye Contact"
*   `description`: Sit in front of the screen and maintain eye contact with another person for 5 minutes. Do not talk, just feel what happens within you. Then write down your thoughts.
*   `duration`: 5 minutes + time for reflection ⏱️
*   `activation_type`: `social` 🗣️
*   `category_id`: `inner_child`
*   `prompt`: Start the video link and maintain eye contact for 5 minutes. Then log your feelings.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What did you feel in your body?"
    *   "Did you feel a connection or discomfort?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Prepare to meet someone through silence.
*   `preparation_message`: Ensure you have a stable connection and a quiet place.

#### Backlog
*   **Purpose:** Practice presence and non-verbal connection through eye contact.
*   **Why:** Builds comfort with silence and strengthens the ability to be present with others.
*   **What it's good for:** Improves social awareness and emotional resilience.
*   **What we want it to lead to:** A deeper sense of connection without words.
*   **Area trained:** Social connection and mental presence.

### ☀️ Sun Salutations

*   `activationId`: `sun_salutations_001`
*   `title`: "Morning Greeting"
*   `description`: Do 9 sun salutations every morning for 12 days. Write down how you feel before and after each day.
*   `duration`: 15-20 minutes per day ⏱️
*   `activation_type`: `physical` 🤸‍♀️
*   `category_id`: `brainsync`
*   `prompt`: Perform 9 sun salutations and log your feelings.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 12
*   `questions`:
    *   "How did your body feel after today's sun salutations?"
    *   "Did you notice any change in your mind over time?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Welcome to a 12-day journey with body and soul.
*   `preparation_message`: Have a yoga mat ready and the terminal accessible.

#### Backlog
*   **Purpose:** Build physical and mental discipline through daily movement.
*   **Why:** Regular sun salutations sync body and mind over time.
*   **What it's good for:** Increases energy, focus, and body awareness.
*   **What we want it to lead to:** A routine that strengthens both body and mind.
*   **Area trained:** Physical endurance and mental balance.

### 🖐️ Finger Coordination

*   `activationId`: `finger_sync_001`
*   `title`: "Synchronized Movements"
*   `description`: Hold up your hands in front of the terminal and follow the instructions to coordinate finger movements. The movements are analyzed via the camera.
*   `duration`: 10 minutes ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `brainsync`
*   `prompt`: Follow the instructions on the terminal and let the camera record your movements.
*   `log_type`: `video` 📹
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`: *(No specific questions)*
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Test your brain's ability to synchronize movements.
*   `preparation_message`: Make sure the terminal's camera is on and you have sufficient light.

#### Backlog
*   **Purpose:** Train the brain's coordination and motor skills.
*   **Why:** Improves the connection between brain and body through movement analysis.
*   **What it's good for:** Increases fine motor skills and mental acuity.
*   **What we want it to lead to:** Insight into the brain's synchronization ability.
*   **Area trained:** Cognitive and physical coordination.

### 🎧 Hemisync Meditation

*   `activationId`: `hemisync_intro_001`
*   `title`: "Hemisync Discovery"
*   `description`: Put on headphones and listen to a 20-minute meditation that synchronizes your brain hemispheres. Then reflect on how it felt.
*   `duration`: 20 minutes ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `sleep` 😴
*   `prompt`: Listen to the meditation via the terminal and log your thoughts afterward.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "How did it feel in your mind after the meditation?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Welcome to a journey into your subconscious.
*   `preparation_message`: Use headphones for the best experience.

#### Backlog
*   **Purpose:** Use sound to balance the brain and promote relaxation.
*   **Why:** Hemisync tones help synchronize brain hemispheres for deeper calm.
*   **What it's good for:** Improves sleep quality and mental clarity.
*   **What we want it to lead to:** A calmer mind and better connection with the subconscious.
*   **Area trained:** Mental relaxation and brain synchronization.

### 📞 Phone Training

*   `activationId`: `phone_dialogue_001`
*   `title`: "The Voice Within"
*   `description`: Call from the terminal and talk to an AI agent for 30 minutes about your ‘Inner Child’. Let the voice guide you and record the conversation.
*   `duration`: 30 minutes ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `inner_child`
*   `prompt`: Call the number and have a conversation with the AI agent. The call is recorded automatically.
*   `log_type`: `audio` 🎙️
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`: *(No specific questions)*
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Overcome fears and meet yourself through your voice.
*   `preparation_message`: Have the terminal ready and test the microphone beforehand.

#### Backlog
*   **Purpose:** Explore the inner child through verbal dialogue with AI support.
*   **Why:** The voice can unlock emotions and memories related to childhood.
*   **What it's good for:** Increases self-awareness and emotional processing.
*   **What we want it to lead to:** Deeper understanding of the inner child.
*   **Area trained:** Emotional awareness and self-reflection.

### 🌬️ Basic Breathwork

*   `activationId`: `breathwork_basic_001`
*   `title`: "The Power of Breath"
*   `description`: Follow a guided breathwork exercise in the terminal and write down how it affected your energy.
*   `duration`: 15 minutes ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `manifest`
*   `prompt`: Listen to the audio file and perform the exercise. Then log your feelings.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "How did the breathing affect your energy?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Breathe in life, breathe out tension.
*   `preparation_message`: Sit comfortably in front of the terminal.

#### Backlog
*   **Purpose:** Use breathing to increase energy and reduce stress.
*   **Why:** Conscious breathing is a simple way to positively affect body and mind.
*   **What it's good for:** Improves energy levels and emotional balance.
*   **What we want it to lead to:** A feeling of lightness and presence.
*   **Area trained:** Emotional and physical balance.

### 👥 Live Breathwork Ceremony

*   `activationId`: `breathwork_live_001`
*   `title`: "The Ceremony of Breath"
*   `description`: Participate in a live-streamed breathwork ceremony via the terminal. Reflect on the experience afterward.
*   `duration`: 45 minutes ⏱️
*   `activation_type`: `live_event` 🔴
*   `category_id`: `manifest`
*   `prompt`: Connect to the live event and follow the instructions. Log your thoughts afterward.
*   `log_type`: `text` 📝
*   `prerequisite`: `breathwork_basic_001`
*   `repetitions`: 1
*   `questions`:
    *   "What did you experience during the ceremony?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `event_date`: `2025-04-01 19:00 CET` 📅
*   `event_link`: `[Link to livestream]` 🔗
*   `introduction_message`: A collective journey through breath awaits.
*   `preparation_message`: Have a stable internet connection and sit comfortably.

#### Backlog
*   **Purpose:** Deepen the breathwork practice in a group for collective energy.
*   **Why:** A shared experience enhances the effect of breathing.
*   **What it's good for:** Strengthens the sense of community and emotional release.
*   **What we want it to lead to:** A powerful feeling of connection and relief.
*   **Area trained:** Social and emotional connection.

### ☯️ Tai Chi/Yoga

*   `activationId`: `tai_chi_flow_001`
*   `title`: "The Dance of Flow"
*   `description`: Follow a 30-minute Tai Chi or yoga sequence via video in the terminal. Write down how it felt in your body.
*   `duration`: 30 minutes ⏱️
*   `activation_type`: `physical` 🤸‍♀️
*   `category_id`: `shadows`
*   `prompt`: Follow the video and log your experience afterward.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "How did the movements feel in your body?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Let your body flow in harmony with your mind.
*   `preparation_message`: Have a mat ready and the terminal set up.

#### Backlog
*   **Purpose:** Train body and mind through gentle, conscious movements.
*   **Why:** Tai Chi and yoga balance energy and reduce tension.
*   **What it's good for:** Increases mobility and inner calm.
*   **What we want it to lead to:** A feeling of harmony and physical lightness.
*   **Area trained:** Physical balance and mental relaxation.

### 👣 Toe Tapping and Quaker's Silence

*   `activationId`: `silence_toes_001`
*   `title`: "The Movement of Silence"
*   `description`: Lie in bed and tap your toes against each other for 5 minutes, followed by 5 minutes of silence. Reflect on what you heard and felt.
*   `duration`: 10 minutes (5 min toe tapping + 5 min silence) ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `sleep` 😴
*   `prompt`: Lie down, tap your toes for 5 minutes, and then listen in silence for 5 minutes. Log your thoughts.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What did you hear in the silence?"
    *   "How did the toe movement affect your mind?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: End the day with movement and silence.
*   `preparation_message`: Keep the terminal near the bed.

#### Backlog
*   **Purpose:** Prepare the body and mind for sleep through movement and stillness.
*   **Why:** The combination calms the nervous system and increases awareness.
*   **What it's good for:** Improves sleep quality and relaxation.
*   **What we want it to lead to:** A calm transition to rest.
*   **Area trained:** Mental relaxation and sleep readiness.

### 🧸 Inner Child Meditation

*   `activationId`: `inner_child_med_001`
*   `title`: "Meeting Your Inner Child"
*   `description`: Listen to a 36-minute guided meditation to meet and heal your inner child. Write down your feelings afterward.
*   `duration`: 36 minutes ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `inner_child`
*   `prompt`: Listen to the meditation and log your feelings.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What did you feel when you met your inner child?"
    *   "What childhood memories surfaced?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Welcome to a journey to heal what has shaped you.
*   `preparation_message`: Use headphones and sit comfortably.

#### Backlog
*   **Purpose:** Process and heal emotions related to childhood.
*   **Why:** Meeting the inner child can release old blockages.
*   **What it's good for:** Increases self-acceptance and emotional healing.
*   **What we want it to lead to:** A sense of peace with the past.
*   **Area trained:** Emotional processing and self-awareness.

### ⛓️ Transcending Limiting Beliefs

*   `activationId`: `limit_beliefs_001`
*   `title`: "Breaking Limiting Beliefs"
*   `description`: Follow the instructions and answer AI questions to identify and reframe limiting beliefs.
*   `duration`: 30 minutes ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `manifest`
*   `prompt`: Answer the questions and log your insights.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What limiting belief did you identify?"
    *   "How can you rephrase it into something empowering?"
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Release what holds you back.
*   `preparation_message`: Sit at the terminal ready to reflect.

#### Backlog
*   **Purpose:** Identify and change thought patterns that limit you.
*   **Why:** Beliefs shape reality, and reframing opens new possibilities.
*   **What it's good for:** Increases self-confidence and mental freedom.
*   **What we want it to lead to:** A more positive and empowering outlook on life.
*   **Area trained:** Mental reprogramming and self-confidence.

### 🕊️ Finding Peace with Your Past

*   `activationId`: `peace_past_001`
*   `title`: "Peace with Your Past"
*   `description`: Write about how your past has strengthened you and share an insight in 'The Net'.
*   `duration`: 20 minutes ⏱️
*   `activation_type`: `social` 💬
*   `category_id`: `shadows`
*   `prompt`: Write about your past and share with `#PeaceWithMyPast`.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What positive lesson has your past taught you?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Transform your past into strength.
*   `preparation_message`: Have the terminal ready for writing.

#### Backlog
*   **Purpose:** Reshape the relationship with the past to find strength.
*   **Why:** Seeing the positive in the past reduces its burden.
*   **What it's good for:** Promotes forgiveness and self-acceptance.
*   **What we want it to lead to:** Inner peace and a strengthened self-image.
*   **Area trained:** Emotional healing and social sharing.

### ❤️‍🩹 Somatic Release Breathwork

*   `activationId`: `somatic_breath_001`
*   `title`: "Somatic Breath Release"
*   `description`: Participate in a breathwork session via the terminal to release trauma. Reflect on what you felt in your body.
*   `duration`: 45 minutes ⏱️
*   `activation_type`: `live_event` 🔴
*   `category_id`: `shadows`
*   `prompt`: Follow the session and log your feelings afterward.
*   `log_type`: `text` 📝
*   `prerequisite`: `peace_past_001`
*   `repetitions`: 1
*   `questions`:
    *   "What did you feel in your body during the breathing?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `event_date`: `2025-04-15 19:00 CET` 📅
*   `event_link`: `[Link to livestream]` 🔗
*   `introduction_message`: Release what weighs you down.
*   `preparation_message`: Eat lightly beforehand and have the terminal ready.

#### Backlog
*   **Purpose:** Release stored tensions and traumas through breathing.
*   **Why:** Body-based breathing reaches deeper than thoughts alone.
*   **What it's good for:** Reduces physical and emotional stress.
*   **What we want it to lead to:** A feeling of relief and freedom.
*   **Area trained:** Physical and emotional healing.

### 🌉 Bridge the Gap (Original)

*   `activationId`: `bridge_gap_001`
*   `title`: "Building the Bridge"
*   `description`: Write about your current and future identity to see what separates them.
*   `duration`: 25 minutes ⏱️
*   `activation_type`: `meditation` 🧘‍♀️ (*Note: Original type was `meditation`, may need review*)
*   `category_id`: `manifest`
*   `prompt`: Write about your current and future identity.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What separates your current identity from your future one?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Begin the journey towards your highest potential.
*   `preparation_message`: Sit at the terminal with the worksheet.

#### Backlog
*   **Purpose:** Create awareness of the difference between the present and future goals.
*   **Why:** Mapping the gap provides direction for personal development.
*   **What it's good for:** Increases self-awareness and goal focus.
*   **What we want it to lead to:** A clear step towards transformation.
*   **Area trained:** Self-awareness and intention.

### 💰 Healing Your Money Mindset

*   `activationId`: `money_mindset_001`
*   `title`: "Healing Your Money Mind"
*   `description`: Listen to a guided meditation to reshape your relationship with money. Write down your thoughts afterward.
*   `duration`: 30 minutes ⏱️
*   `activation_type`: `meditation` 🧘‍♀️
*   `category_id`: `manifest`
*   `prompt`: Listen to the meditation and log your reflections.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What money myths do you carry?"
    *   "How can you welcome money with gratitude?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Embrace money as a force for good.
*   `preparation_message`: Use headphones with the terminal.

#### Backlog
*   **Purpose:** Change negative thoughts about money into positive ones.
*   **Why:** A healthy money mindset supports personal freedom and well-being.
*   **What it's good for:** Reduces financial stress and increases gratitude.
*   **What we want it to lead to:** A positive approach to money.
*   **Area trained:** Mental reprogramming and prosperity consciousness.

### 🧭 The Purpose Journey

*   `activationId`: `purpose_journey_001`
*   `title`: "The Journey of Purpose"
*   `description`: Write about your phase in the journey of purpose and share your thoughts in 'The Net'.
*   `duration`: 25 minutes ⏱️
*   `activation_type`: `social` 💬
*   `category_id`: `manifest`
*   `prompt`: Write about your journey and share with `#MyPurposeJourney`.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What signs have led you here?"
    *   "What challenges are you facing now?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Discover your path to a meaningful life.
*   `preparation_message`: Have the terminal ready for writing.

#### Backlog
*   **Purpose:** Reflect on life's meaning and share with others.
*   **Why:** Articulating purpose strengthens motivation and community.
*   **What it's good for:** Increases clarity around personal goals and values.
*   **What we want it to lead to:** A clearer sense of direction in life.
*   **Area trained:** Self-reflection and social connection.

### 👀 Silent Eye Contact Live

*   `activationId`: `silent_eye_contact_001`
*   `title`: "Silent Eye Contact Live"
*   `description`: Connect live with another user via webcam. Sit silently and look at each other for 5 minutes without talking. Then write down your thoughts in a separate reflection step.
*   `duration`: 5 minutes + reflection time ⏱️
*   `activation_type`: `live_interaction` 🤝
*   `category_id`: `inner_child`
*   `prompt`: Sit silently and look at the other person via the webcam for five minutes. Do not talk. Then log what you felt.
*   `log_type`: `text` 📝
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`:
    *   "What did you feel or notice during the exercise?"
*   `ai_assessment`: `False`
*   `coach_approval_required`: `False`
*   `net_enabled`: `True` 🌐
*   `introduction_message`: Prepare to meet another person in silence – a powerful way to build presence.
*   `preparation_message`: Ensure you have a stable connection and the webcam is on.

#### Backlog
*   **Purpose:** Practice presence and social connection through silence.
*   **Why:** Meeting someone in silence builds non-verbal understanding and presence.
*   **What it's good for:** Improves social awareness and emotional resilience.
*   **What we want it to lead to:** A stronger sense of connection without words.
*   **Area trained:** Social connection and mental presence.

### 🤸‍♀️ Balance and Body Analysis

*   `activationId`: `balance_body_001`
*   `title`: "Balance and Body Analysis"
*   `description`: Lie on your back, bring your legs towards your stomach, hold your legs, and rock back and forth for 3 minutes. The movement is analyzed via the camera to provide insight into the body's balance and muscle usage.
*   `duration`: 3 minutes ⏱️
*   `activation_type`: `ai_assessment` 🤖
*   `category_id`: `brainsync`
*   `prompt`: Lie on your back, bring your legs towards your stomach, and rock back and forth. Let the camera record your movement.
*   `log_type`: `video` 📹
*   `prerequisite`: None
*   `repetitions`: 1
*   `questions`: *(No specific questions)*
*   `ai_assessment`: `True` 🤖
*   `coach_approval_required`: `False`
*   `net_enabled`: `False`
*   `introduction_message`: Test your body's balance and muscle usage.
*   `preparation_message`: Make sure the terminal's camera is on and you have enough space.

#### Backlog
*   **Purpose:** Analyze the body's balance and muscle usage through movement.
*   **Why:** Provides insight into physical patterns and strengths/weaknesses.
*   **What it's good for:** Improves body awareness and can guide physical development.
*   **What we want it to lead to:** Clearer understanding of the body's balance.
*   **Area trained:** Physical balance and body awareness.

## 🔧 Technical Details

*   **💻 The Terminal:** Used to log experiences (`text` 📝, `video` 📹, `audio` 🎙️) and supports text input as well as the use of the camera 📸 and microphone 🎤.
*   **💾 Media:** Audio files for meditations 🎵 and video files for instructions 🎬 are stored in Firebase `Storage` and streamed directly in the terminal interface.
*   **🧠 AI Integration:** Exercises marked with `ai_assessment: True` 🤖 use the terminal's built-in AI capabilities to analyze data (e.g., movements in "Finger Coordination" and "Balance and Body Analysis").
*   **🔴 Live Events:** The terminal handles connection to livestream links 🔗 for scheduled `live_event`s like "The Ceremony of Breath" and "Somatic Breath Release".

## ✅ Conclusion

This document compiles 18 `activations` that form the core of InnerJourney's exercise library at this time. They cover a broad spectrum of personal development, from social connection and self-reflection to physical balance and emotional healing.

Each `activation` is carefully designed to fit the app's technical framework and provide the user with a meaningful and engaging experience. The next steps involve implementing these `activations` within the application. 🚀