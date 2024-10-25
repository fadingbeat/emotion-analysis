# Emotion Detection Web Application

This web application leverages the Twinword API to analyze user input and detect emotions. Built with color emotion psychology in mind, this app offers users an interactive experience where detected emotions are represented with corresponding colors. Users can input prompts, and the application will return an emotional analysis with color associations.

### Table of Contents

Features
Prerequisites
Getting Started
Environment Variables
Running the App
Technologies Used

### Features

Emotion Detection: Analyzes user input to detect the underlying emotion.
Color Interaction: Visual representation of emotions using colors based on color emotion psychology.

### Prerequisites

To run this project locally, make sure you have the following:

Twinword API Account: Sign up for a free tier account on Twinword API to obtain an API key.
Node.js: Ensure you have Node.js installed on your system.
Netlify CLI: Install Netlify CLI to help run and deploy locally.

## Getting Started

Follow these steps to set up the project locally:

1. Clone the Repository

```bash
git clone https://github.com/fadingbeat/emotion-analysis.git
cd emotion-analysis
```

2. Install Dependencies

Install all project dependencies specified in package.json:

```bash
npm install
```

3. Set Up Environment Variables

You’ll need to create an environment file to store sensitive information like API keys.
Create an .env file at the root of the project.
Add the following keys to the .env file:

```bash
BASE_URL=https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/
TWINWORD_API_KEY=<Your_Twinword_API_Key>
```

Replace <Your_Twinword_API_Key> with the API key you obtained from Twinword.

4. Install and Configure Netlify

To run the application locally, install the Netlify CLI if you haven’t already:

```bash
npm install -g netlify-cli
```

You can then use Netlify to serve the application locally on localhost:8888.

## Running the App

Once your environment variables are set and dependencies are installed, start the application by running:

```bash
netlify dev
```

or

```bash
npm run netlify dev
```

By default, the application will be available at http://localhost:8888.

## Technologies Used

Angular 16
Twinword API for emotion detection
Netlify for local development and deployment

Let me know if you'd like additional details on any specific part!
