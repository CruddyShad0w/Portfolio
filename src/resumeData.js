const resumeData = {
  imagebaseurl: 'https://cruddyshad0w.github.io/Portfolio/',
  name: 'Kyle Hays',
  email: 'kyle.m.hays@gmail.com',
  role: 'Senior Full Stack Engineer',
  linkedinId: 'https://www.linkedin.com/in/kylehays800/',
  roleDescription:
    ' I like to develop websites utilizing new technologies, visualize data in an engaging format, as well as create machine learning algorithims to make meaningful predictions',
  socialLinks: [
    {
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/kylehays800/',
      className: 'fa fa-linkedin',
    },
    {
      name: 'github',
      url: 'https://github.com/CruddyShad0w',
      className: 'fa fa-github',
    },
    {
      name: 'resume',
      url: `${process.env.PUBLIC_URL}/files/Kyle_Hays_Resume.pdf`,
      className: 'fa fa-file-text',
    },
  ],
  aboutme:
    'Experienced Senior Full Stack Engineer with a proven track record in developing enterprise applications and web solutions. Skilled in Angular, NestJS, and other technologies, I have successfully delivered critical projects and data metrics to support key performance indicators. With a background in teaching and mentoring, I excel at providing technical assistance and explaining complex concepts. I have a strong passion for leveraging innovative technologies to create user-friendly applications.',
  address: 'San Jose, CA',
  website: 'https://cruddyshad0w.github.io/Portfolio/',
  education: [
    {
      UniversityName: 'California State University at Monterey Bay',
      specialization: 'B.S. in Computer Science - Data Science',
      MonthOfPassing: 'Fall',
      YearOfPassing: '2019',
    },
  ],
  work: [
    {
      CompanyName: 'Tria Federal',
      specialization: 'Senior Full Stack Engineer',
      MonthOfLeaving: 'Present',
      YearOfLeaving: '',
      Achievements:
        'Lead development across three high-visibility enterprise applications (Self-Nomination, Targeted Review, Exceptions) built using Angular (TypeScript), NestJS (TypeScript/Express), New Relic, and AWS infrastructure. Serve as the technical point of contact in the absence of team leads, authoring technical specifications, mentoring junior engineers, and performing final production sign-offs. Architected data analytics dashboards and visualizations with D3.js; authored the majority of SQL metric logic, now part of a scalable shared widget library. Built and deployed services using Docker containers on AWS, ensuring stability, scalability, and CI/CD compliance. Spearheaded accessibility efforts, implementing 508 compliance across all applications and passing all government audits. Migrated legacy applications to modern versions, improving stability, security, and developer productivity. Improved Jest unit tests in CI/CD pipeline, decreasing build time by 30%. Implemented database query improvements in TypeORM and MySQL, reducing application load time by 80%.',
    },
    {
      CompanyName: 'Visions in Education',
      specialization: 'Full Stack Developer',
      MonthOfLeaving: 'May',
      YearOfLeaving: '2021',
      Achievements:
        "Developed web applications in Angular and Python to streamline student enrollment and physical asset tracking, supporting over 5,000 students at California's largest charter school. Built advanced enrollment tracking tools that boosted productivity, allowing for faster student enrollment and reducing manual tracking errors. Developed a physical asset and repair tracking system, ensuring compliance with government standard, and completed the project 2 weeks ahead of the deadline.",
    },
    {
      CompanyName: 'UC Berkeley Extension',
      specialization: 'Teacher Assistant',
      MonthOfLeaving: 'November',
      YearOfLeaving: '2020',
      Achievements:
        'Mentored students in full-stack data engineering and visualizations using Python, SQL, and JavaScript. Improving comprehension rates and ensuring 100% course completion for mentored students.',
    },
    {
      CompanyName: 'Capital Insurance Group',
      specialization: 'Data Analyst',
      MonthOfLeaving: 'December',
      YearOfLeaving: '2019',
      Achievements:
        "Built a PowerBI dashboard to track call center KPI's including issue tracking, average handle time, and key issue influencer to improve response time in the call center and reduce overall unresolved issues. Developed an ETL pipeline to link PowerBI and Jira automating data extraction leading to quicker and more accurate visualizations for decision-making.",
    },
    {
      CompanyName: 'California State University - Monterey Bay',
      specialization: 'Teacher Assistant',
      MonthOfLeaving: 'December',
      YearOfLeaving: '2019',
      Achievements:
        'Proactively mentor students in advanced machine learning and neural network concepts. Provide technical assistance on key concepts used in machine learning, statistics, data engineering, and data visualization.',
    },
    {
      CompanyName: 'Community Bridges',
      specialization: 'Data Analyst',
      MonthOfLeaving: 'May',
      YearOfLeaving: '2019',
      Achievements:
        "Developed a report to highlight funding, demographic, and services rendered for Community Bridges. Provided them the means to obtain more government grant's to supplement their income to increase services rendered. Developed an ETL pipeline to ingest data from a data lake for analysis. Provided plots developed in matplotlib and seaborn in a Jupyter Notebook for detailed analysis.",
    },
  ],
  skillsDescription: '',
  skills: [
    {
      skillname: 'Full-Stack Development',
      style: '40%',
    },
    {
      skillname: 'Data Engineering',
      style: '25%',
    },
    {
      skillname: 'Data Visualization',
      style: '13%',
    },
    {
      skillname: 'Machine Learning / AI',
      style: '12%',
    },
  ],
  portfolio: [
    {
      name: 'Trip GPT',
      description: 'AI Trip Planning',
      imgurl: 'images/portfolio/tripgpt.png',
      location: 'https://github.com/CruddyShad0w',
    },
    {
      name: 'Agent Swarm',
      description: 'AI Market Analysis',
      imgurl: 'images/portfolio/agentswarm.png',
      location: 'https://github.com/CruddyShad0w',
    },
    {
      name: 'Data Analytics Dashboard',
      description: 'Data Visualization',
      imgurl: 'images/portfolio/CIG.png',
      location: 'images/portfolio/Capital Insurance - Team 6.pdf',
    },
    {
      name: 'Polr',
      description: 'Full-Stack Website',
      imgurl: 'images/portfolio/polr.png',
      location: 'https://github.com/CruddyShad0w/polr',
    },
    {
      name: 'Tensorflow - RNN',
      description: 'AI Text Prediction',
      imgurl: 'images/portfolio/tensorflow_rnn.png',
      location: 'https://github.com/CruddyShad0w/Tensorflow-RNN/blob/master/Project2%20(1).ipynb',
    },
    {
      name: 'Credit Card Default Prediction',
      description: 'Machine Learning',
      imgurl: 'images/portfolio/MachineLearning.jpg',
      location: 'https://github.com/CruddyShad0w/Credit-Card-Default-Prediction',
    },
  ],
  testimonials: [
    {
      description: 'Kyle was a great team member when developing multiple Full-Stack websites.',
      name: 'Brett Stevenson',
    },
    {
      description: 'Kyle has demonstrated advanced knowledge with Python and Java microservices.',
      name: 'Kellen Rice',
    },
    {
      description: 'Kyle has excellent knowledge of python as it relates to Machine Learning.',
      name: 'Ethan Henderson',
    },
  ],
};

export default resumeData;
