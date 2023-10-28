import React, { useState } from "react";
import { createContext } from "react";
//import { useNavigate, useLocation } from "react-router-dom";

const QuizContext = createContext();

const quizSets = {
  DataScientist: [
    {
      question:
        "What is the difference between supervised and unsupervised learning?",
      a: "Supervised learning uses labeled data for training, while unsupervised learning uses unlabeled data.",
      b: "Supervised learning is faster and more accurate than unsupervised learning",
      c: "Supervised learning does not require a training phase",
      d: "Unsupervised learning requires human intervention for labeling data.",
      correct: "a",
    },
    {
      question:
        "Explain the concept of feature selection and its importance in machine learning.",
      a: "Feature selection is the process of removing all features from a dataset..",
      b: "Feature selection is irrelevant in machine learning.",
      c: "Feature selection involves picking the most relevant dataset features to enhance model performance.",
      d: "Feature selection is only applicable in supervised learning..",
      correct: "c",
    },

    {
      question: "What is the purpose of cross-validation in model evaluation?",
      a: "Cross-validation is used to train models on larger datasets..",
      b: "Cross-validation prevents overfitting by evaluating a model on various data subsets.",
      c: "Cross-validation is only applicable in unsupervised learning..",
      d: "Cross-validation is used for data preprocessing.",
      correct: "b",
    },
    {
      question:
        "Describe the difference between classification and regression algorithms.",
      a: " Classification predicts discrete labels, while regression predicts continuous values..",
      b: "Classification always predicts numeric values, while regression predicts categories.",
      c: "Classification and regression are the same; they can be used interchangeably.",
      d: "Classification and regression are not used in machine learning..",
      correct: "a",
    },
    {
      question:
        "Explain the concept of overfitting in machine learning and how to mitigate it",
      a: "Overfitting occurs when a model is too simple to capture the data patterns.",
      b: "Overfitting occurs when a model learns noise in the training data and performs poorly on new data.",
      c: "Overfitting is a desirable outcome in machine learning.",
      d: "Overfitting can be eliminated by adding more features to the model.",
      correct: "b",
    },
    {
      question: "What are the steps involved in the data preprocessing phase?",
      a: "Data preprocessing is not necessary in data science.",
      b: "Steps include data collection, model training, and evaluation.",
      c: " Steps include data cleaning, data transformation, and feature engineering..",
      d: " Data preprocessing is only relevant in unsupervised learning..",
      correct: "c",
    },
    {
      question:
        "Process of evaluating and selecting the right machine learning model for a given problem.",
      a: "Model deployment.",
      b: "Model training.",
      c: "Model selection.",
      d: "Model validation.",
      correct: "c",
    },
    {
      question: "The concept of ensemble learning and its advantages.",
      a: "Ensemble learning is the use of a single model for predictions..",
      b: "Ensemble learning combines model predictions for better performance and reduced overfitting.",
      c: "Ensemble learning is only used in regression problems",
      d: "Ensemble learning can only be applied to small datasets.",
      correct: "b",
    },
    {
      question:
        "How do you handle missing data in a dataset during data analysis?",
      a: "Remove all rows with missing data.",
      b: " Replace missing values with zeros..",
      c: "Impute missing values using statistical methods or algorithms..",
      d: " Missing data doesn't affect data analysis.",
      correct: "c",
    },
    {
      question: "What is the main difference between bagging and boosting?",
      a: " Bagging combines predictions from independently trained models for better accuracy.",
      b: " Bagging focuses on reducing bias and improving model performance.",
      c: "Bagging is a sequential process, giving more weight to misclassified instances.",
      d: " Bagging is less prone to overfitting.",
      correct: "a",
    },
  ],

  SoftwareEngineer: [
    {
      question: "What is polymorphism?",
      a: "the process of converting code from one programming language to another",
      b: "the ability of an object to take on many forms",
      c: "the practice of writing efficient and optimized code",
      d: "the process of encrypting sensitive data in software applications",
      correct: "b",
    },
    {
      question: "Difference between synchronous and asynchronous programming?",
      a: "Synchronous programming allows for parallel execution, while asynchronous programming executes tasks sequentially.",
      b: "Synchronous programming blocks execution, while asynchronous programming allows non-blocking execution.",
      c: "Synchronous programming is used for front-end development, while asynchronous programming is used for back-end development.",
      d: "Synchronous programming is more efficient than asynchronous programming.",
      correct: "b",
    },

    {
      question: "What is agile software development?",
      a: "A methodology that emphasizes comprehensive documentation and extensive planning.",
      b: "That involves fixed and rigid project requirements.",
      c: "Promotes iterative and incremental development, allowing for flexibility and adaptability.",
      d: "Focuses on delivering a fully functional product in a single",
      correct: "c",
    },
    {
      question:
        "What are the steps involved in the software development life cycle (SDLC)?",
      a: "Requirements, design, implementation, testing, deployment, maintenance.",
      b: "Planning, coding, testing,deployment and documentation",
      c: "Analysis, coding, testing, and deployment",
      d: "Design, coding, testing, deployment and maintenance.",
      correct: "a",
    },
    {
      question: "What is the purpose of code refactoring?",
      a: "Improves the performance of the software",
      b: "Enhances the readability and maintainability of the code",
      c: "Fixes bugs and resolves issues in the code",
      d: "Adds new features and functionality to the software",
      correct: "b",
    },
    {
      question: "What is CI/CD pipeline?",
      a: "CI/CD pipeline is a set of practices for automating the software development process, including integration, testing, and deployment.",
      b: "It involves the continuous integration of code changes, followed by automated testing and continuous deployment to production environments.",
      c: "The purpose of a CI/CD pipeline is to streamline software development, improve code quality, and enable faster and more reliable releases.",
      d: " CI/CD pipeline facilitates collaboration among development, testing, and operations teams, ensuring that changes are smoothly integrated and deployed.",
      correct: "a",
    },
    {
      question: "Git is a?",
      a: "A tool for tracking changes in source code during software development.",
      b: "Git enables seamless collaboration and code merging among multiple developers.",
      c: "It provides a history of changes, branch management, and easy code rollback.",
      d: "A distributed version control system.",
      correct: "d",
    },
    {
      question: "Difference between unit testing and integration testing?",
      a: "Unit testing tests individual components or units of code, while integration testing tests the interaction between different components.",
      b: "Unit testing is focused on verifying the correctness of individual units, while integration testing ensures that components work together correctly.",
      c: "Unit testing is performed by developers, while integration testing validates system behavior.",
      d: "All of the above",
      correct: "d",
    },
    {
      question: "Difference between SQL and NoSQL?",
      a: "SQL databases are vertically scalable while NoSQL databases are horizontally scalable",
      b: "SQL databases are typically used for transactions, while NoSQL databases are suitable for large-scale distributed systems.",
      c: "None of the above are correct.",
      d: "a and b both are correct",
      correct: "d",
    },
    {
      question: "How to display an image in HTML?",
      a: "<img href=path alt=image-description>",
      b: "<img src=image-url alt=image-description>",
      c: "<img link=image-url alt=image-description>",
      d: "<img source=image-url alt=image-description>",
      correct: "b",
    },
  ],

  NetworkEngineer: [
    {
      question:
        "What is the difference between a router and a switch in networking?",
      a: "Routers connect devices within the same local network, while switches connect different networks.",
      b: "Routers operate at the physical layer of the OSI model, while switches operate at the network layer.",
      c: "Routers determine the best path for data packets to travel between networks, while switches forward data within a network.",
      d: " Routers and switches are functionally identical in networking.",
      correct: "c",
    },

    {
      question:
        "The concept of subnetting and how it is used in IP addressing.",
      a: "Subnetting is a way to divide an IP address into smaller, more manageable parts for routing purposes.",
      b: " Subnetting is a method to increase the total number of available IP addresses.",
      c: " Subnetting is only used in IPv6 addressing.",
      d: "Subnetting has no relevance in IP addressing.",
      correct: "a",
    },

    {
      question:
        "What is the purpose of DNS (Domain Name System) in computer networks?",
      a: "DNS is used to encrypt data transmissions over the internet.",
      b: " DNS converts human-readable domain names into IP addresses for routing.",
      c: "DNS is a firewall for network security",
      d: "DNS is used for routing data packets in a network.",
      correct: "b",
    },

    {
      question: "Describe the difference between TCP and UDP protocols",
      a: "TCP is faster than UDP.",
      b: "TCP: reliable, connection-oriented data. UDP: connectionless, unreliable.",
      c: "TCP: connectionless, unreliable. UDP: reliable, connection-oriented data. ",
      d: "TCP and UDP are identical in their operation.",
      correct: "b",
    },

    {
      question: "What is the purpose of a firewall in network security?",
      a: "To increase network speed and performance.",
      b: "To prevent unauthorized access and control the flow of data traffic.",
      c: "To route data packets between networks.",
      d: "To convert IP addresses to domain names.",
      correct: "b",
    },

    {
      question: "Explain the concept of virtual private network (VPN).",
      a: " VPN is a physical network used for gaming",
      b: " VPN is a type of software used for web browsing",
      c: "VPN is a secure network connection that allows users to access a private network over a public network.",
      d: "VPN is a hardware device for boosting Wi-Fi signals.",
      correct: "c",
    },

    {
      question: "What is the difference between IPv4 and IPv6 addressing?",
      a: " IPv4 uses 32-bit addresses, while IPv6 uses 128-bit addresses.",
      b: "IPv4 is a newer version of IP addressing compared to IPv6",
      c: "IPv4 and IPv6 are functionally identical.",
      d: " IPv4 is used for internal networking, while IPv6 is used for external networking.",
      correct: "a",
    },

    {
      question: "What is a VLAN (Virtual LAN), and how does it work?",
      a: "A VLAN is a physical network cable",
      b: "A VLAN is a network security protocol.",
      c: "A VLAN is a logical network created within a physical network to isolate traffic.",
      d: "A VLAN is a type of wireless network.",
      correct: "c",
    },

    {
      question: "The concept of network load balancing",
      a: "Network load balancing is a method for increasing network security.",
      b: "Network load balancing distributes traffic among multiple servers to boost performance and reliability.",
      c: "Network load balancing is a form of network encryption.",
      d: "Network load balancing is used exclusively in small-scale networks.",
      correct: "b",
    },

    {
      question: "Advantages of virtual private network (VPN).",
      a: "VPNs slow down network connections.",
      b: "VPNs are only used for gaming.",
      c: "VPNs provide secure access to a private network over a public network, enhancing privacy and security.",
      d: "VPNs are only relevant in wireless networks.",
      correct: "c",
    },
  ],

  DevopsEngineer: [
    {
      question:
        "What is DevOps, and why is it important in software development? ",
      a: " DevOps is a software development methodology that focuses on individual coding skills. ",
      b: "DevOps is a project management framework for software development. ",
      c: "DevOps combines development and operations to enhance software delivery speed and reliability.",
      d: "DevOps is an operating system for software development. ",
      correct: "c",
    },

    {
      question: "The concept of infrastructure as code and its benefits.",
      a: "Infrastructure as code is a method for storing user data.",
      b: "Infrastructure as code is a practice of managing infrastructure using manual processes.",
      c: "Infrastructure as code automates infrastructure provisioning and management, ensuring version control and scalability.",
      d: "Infrastructure as code is only applicable in virtualization.",
      correct: "c",
    },

    {
      question:
        "The role of configuration management tools in DevOps practices.",
      a: " Configuration management tools are used for software development only.",
      b: "Configuration management tools automate and manage infrastructure and application configurations.",
      c: "Configuration management tools are only used in traditional waterfall project management. ",
      d: "Configuration management tools are used to automate monitoring. ",
      correct: "b",
    },

    {
      question:
        "What is containerization, and how is it different from virtualization? ",
      a: "Containerization is a technique for virtualizing hardware resources. ",
      b: " Containerization and virtualization are identical concepts",
      c: "Containerization packages applications and dependencies in containers for efficient deployment, while virtualization emulates entire virtual machines. ",
      d: "Containerization run dependencies in containers for efficient deployment, while virtualization emulates entire virtual machines. ",
      correct: "c",
    },

    {
      question: "The concept of monitoring and alerting in DevOps. ",
      a: "Monitoring and alerting are not relevant in DevOps practices. ",
      b: " Monitoring continuously observes performance and alerts based on predefined thresholds or events.",
      c: "Monitoring is the same as logging. ",
      d: "Monitoring and alerting are used solely for security purposes.",
      correct: "b",
    },

    {
      question:
        "What is the difference between orchestration and configuration management tools?",
      a: "Orchestration and configuration management tools are the same. ",
      b: "Orchestration automates workflows and coordinates tasks, while configuration management automates infrastructure and application configuration.",
      c: "Configuration management tools are used for managing code repositories. ",
      d: "Orchestration tools are used only in traditional project management.",
      correct: "b",
    },

    {
      question:
        "How would you ensure high availability and scalability in a DevOps environment? ",
      a: "High availability and scalability are not important in DevOps.",
      b: "By manually scaling resources when needed.",
      c: "By automating, balancing loads, and monitoring resources to ensure service availability during increased demand.",
      d: "By reducing the number of servers in the environment.",
      correct: "c",
    },

    {
      question: "The concept of continuous monitoring in DevOps practices.",
      a: "Continuous monitoring is a one-time activity performed at the end of the software development process.",
      b: "Continuous monitoring is the same as manual testing.",
      c: "Continuous monitoring means real-time system and application observation to proactively detect and address issues. ",
      d: " Continuous monitoring is not applicable in DevOps. ",
      correct: "c",
    },

    {
      question:
        "What is the purpose of continuous integration and continuous deployment (CI/CD) ? ",
      a: " CI/CD is a type of software testing. ",
      b: "CI/CD aims to slow down the software development process. ",
      c: " CI/CD automates code integration, testing, and deployment to speed up software delivery and enhance quality.",
      d: "CI/CD is only used in manual software development processes.",
      correct: "c",
    },

    {
      question: "What are the key principles of DevOps? ",
      a: "DevOps principles focus on individual coding practices.",
      b: "DevOps emphasizes CAMS (Collaboration, Automation, Measurement, and Sharing) and a cultural shift towards automation and sharing. ",
      c: "DevOps principles are limited to software development only. ",
      d: "DevOps principles emphasize isolation of development and operations teams. ",
      correct: "b",
    },
  ],

  UiUxEngineer: [
    {
      question:
        " What is the difference between user interface (UI) design and user experience (UX) design?",
      a: "UI design concerns itself with aesthetics and layout, while UX design addresses the overall user journey and satisfaction. ",
      b: " UI design is only concerned with technical aspects, while UX design focuses on content creation.",
      c: "UI and UX design are the same thing ",
      d: "UI design focuses on functionality, while UX design deals with visual elements only. ",
      correct: "a",
    },

    {
      question: " The purpose of wireframing in the design process?",
      a: "Wireframing is used for creating the final design of a website or application. ",
      b: " Wireframing helps in sketching user interface ideas and layouts without getting into design details.",
      c: " Wireframing is used to test the performance of a website. ",
      d: "Wireframing is only applicable to print design.",
      correct: "b",
    },

    {
      question: "The concept of responsive web design and its benefits.",
      a: "Responsive web design is a method for creating static web pages. ",
      b: "Responsive web design adapts websites to various screen sizes and devices, enhancing the user experience.",
      c: "Responsive web design focuses on optimizing web content for search engines. ",
      d: " Responsive web design is only relevant for desktop computers. ",
      correct: "b",
    },

    {
      question:
        "What are the steps involved in creating a user-centered design?",
      a: "User-centered design understands user needs, creates solutions, tests with users for feedback, and iterates for improvement. ",
      b: "User-centered design consists of sketching ideas and implementing them without user input.",
      c: "User-centered design focuses solely on visual elements. ",
      d: "User-centered design involves copying designs from popular websites.",
      correct: "a",
    },

    {
      question:
        "What are the principles of usability and accessibility in UI/UX design?",
      a: "Usability focuses on making designs visually appealing, while accessibility ensures that designs are responsive ",
      b: "Usability aims for efficient, effective, and satisfying designs, while accessibility ensures usability for people with disabilities.",
      c: "Usability and accessibility are the same concept ",
      d: "Usability is only concerned with technical aspects ",
      correct: "b",
    },

    {
      question: "The purpose of prototyping in the design process? ",
      a: "Prototyping is used to create the final design of a website or application. ",
      b: " Prototyping is only relevant in print design.",
      c: "Prototyping tests design functionality and layout before implementation.",
      d: "Prototyping is used for documenting design specifications. ",
      correct: "c",
    },

    {
      question:
        "Explain the importance of visual hierarchy in interface design. ",
      a: "Visual hierarchy is not relevant in interface design.",
      b: "Visual hierarchy guides user attention by showing element importance. " ,
      c: "Visual hierarchy is only important for text-based content. ",
      d: "Visual hierarchy focuses on color selection in design. ",
      correct: "b",
    },

    {
      question: "What is the role of A/B testing in UI/UX design? ",
      a: "A/B testing is used for creating wireframes. ",
      b: "A/B testing compares design variations to find the best-performing one",
      c: "A/B testing is only used for backend development. ",
      d: "A/B testing is a form of usability testing.",
      correct: "b",
    },

    {
      question: "What is the role of personas in UI/UX design?",
      a: "Personas are used for documenting project requirements ",
      b: "Personas are fictional user representations for empathy and understanding.",
      c: "Personas are used for coding and programming. ",
      d: "Personas are only used in marketing.",
      correct: "b",
    },

    {
      question:
        "How can UI/UX design contribute to a positive user experience? ",
      a: " UI/UX design is not relevant to user experience ",
      b: " UI/UX design focuses solely on aesthetics",
      c: "UI/UX design improves interfaces, usability, and user satisfaction.",
      d: "UI/UX design is limited to technical aspects only. ",
      correct: "c",
    },
  ],

  SystemAdministrator: [
    {
      question: "What is the primary responsibility of a system administrator?",
      a: "Developing software applications. ",
      b: "Managing and maintaining computer systems and networks.",
      c: "Designing user interfaces. ",
      d: "Managing marketing campaigns.",
      correct: "b",
    },

    {
      question:
        "The process of installing and configuring an operating system ",
      a: " Operating system installation involves replacing hardware components. ",
      b: "Operating system installation is not necessary in modern computers.",
      c: "Operating system installation involves loading the OS onto storage and configuring settings. ",
      d: "Operating system installation is the same as system updates.",
      correct: "c",
    },

    {
      question:
        "The purpose of system logs and how are they used in troubleshooting? ",
      a: "System logs are used for tracking user activities only. ",
      b: "System logs are not relevant to troubleshooting ",
      c: "System logs track events, aiding issue diagnosis and troubleshooting. ",
      d: "System logs are used for storing backups. ",
      correct: "c",
    },

    {
      question:
        "How do you manage user accounts and access control in a network? ",
      a: "User account management is not a concern for system administrators. ",
      b: "User account management handles account actions, while access control regulates resource access.",
      c: "Access control involves monitoring system logs.",
      d: "User accounts are automatically managed by the operating system. ",
      correct: "b",
    },

    {
      question: "The concept of system virtualization and its benefits. ",
      a: "System virtualization involves creating physical copies of computer systems. ",
      b: "System virtualization is used exclusively for gaming.",
      c: "System virtualization is the same as system backups." ,
      d: "System virtualization enables multiple VMs on a single host for efficient resource use.",
      correct: "d",
    },

    {
      question: "How do you perform system backups and ensure data recovery?",
      a: "Regular backups and recovery plans protect data from loss or disasters. ",
      b: "Data recovery involves reinstalling the operating system.",
      c: "System backups are not necessary for data recovery.",
      d: "Data recovery is the same as data deletion.",
      correct: "a",
    },

    {
      question:
        "The concept of high availability and its significance in system administration. ",
      a: "High availability refers to the availability of software updates. ",
      b: "High availability is not a concern for system administrators.",
      c: "High availability ensures continuous operation despite failures for uninterrupted services. ",
      d: "High availability only applies to network security.",
      correct: "c",
    },

    {
      question:
        "The role of system monitoring tools in infrastructure management? ",
      a: "System monitoring tools are used for graphic design. ",
      b: "System monitoring tools are not relevant to infrastructure management.",
      c: "System monitoring tools are used for system backups.",
      d: "System monitoring tools continuously observe and report on system performance. ",
       
      correct: "d",
    },

    {
      question:
        "What is the purpose of system monitoring tools in system administration?",
      a: "System monitoring tools are used for creating user accounts. ",
      b: "System monitoring tools are used for data recovery.",
      c: "System monitoring tools help administrators detect issues and optimize system performance..",
      d: "System monitoring tools are only used for system installation",
      correct: "c",
    },

    {
      question:
        "What is the purpose of system documentation in system administration ",
      a: "System documentation is not necessary in system administration.",
      b: "System documentation is used for marketing purposes.",
      c: "System documentation provides essential guidance for system configuration and maintenance. ",
      d: "System documentation is used for system configuration and user account management.",
      correct: "c",
    },
  ],

  DatabaseAdministrator: [
    {
      question: "What is the purpose of a database management system (DBMS)?",
      a: " To create and design databases. ",
      b: "To manage and organize data, ensure data integrity, and provide tools for data retrieval and manipulation. ",
      c: " To secure physical database servers. ",
      d: "To develop database applications. ",
      correct: "b",
    },

    {
      question:
        "The difference between a relational database and a non-relational database. ",
      a: "Relational databases use fixed schemas and tables, non-relational databases offer flexibility in schemas and data formats.",
      b: " Relational databases are always faster than non-relational databases.",
      c: "Relational databases are only used in small-scale applications. ",
      d: "Relational and non-relational databases are identical. ",
      correct: "a",
    },

    {
      question:
        "What is the primary responsibility of a database administrator (DBA)? ",
      a: "Developing software applications.",
      b: "Designing user interfaces.",
      c: "Managing and maintaining the database, ensuring its performance, security, and availability.",
      d: "Writing SQL queries.",
      correct: "c",
    },

    {
      question:
        "What is the purpose of database backups in database administration? ",
      a: "Database backups are created to take up extra storage space.",
      b: "Database backups are used for primary data storage.  ",
      c: "Database backups are essential for data recovery in case of data loss, corruption, or disasters.",
      d: " Database backups are used for load balancing. ",
      correct: "c",
    },

    {
      question:
        "Which of the following is an example of a non-relational (NoSQL) database? ",
      a: "MySQL",
      b: " PostgreSQL",
      c: "MongoDB",
      d: " Oracle",
      correct: "c",
    },

    {
      question: "What is the purpose of database transaction management? ",
      a: "Transaction management is not relevant in database administration. ",
      b: " Database transaction management maintains data integrity with ACID properties. ",
      c: "Transaction management is only used for database backups. ",
      d: "Transaction management is the same as database normalization. ",
      correct: "b",
    },

    {
      question:
        "The role of database monitoring and maintenance in a production environment? ",
      a: "Database monitoring and maintenance are not necessary in a production environment.",
      b: "Database monitoring evaluates logs, performance, and health, while maintenance includes optimization, updates, and backups.  ",
      c: "Database monitoring is used for system administration ",
      d: "Database monitoring evaluates logs while maintenance includes optimization, updates, and backups.",
      correct: "b",
    },

    {
      question: "What is the purpose of database normalization? ",
      a: " Database normalization is used for data encryption",
      b: "  Database normalization is the process of optimizing database performance. ",
      c: " Normalization reduces data redundancy and enhances data integrity. ",
      d: "Database normalization is the same as data backup. ",
      correct: "c",
    },

    {
      question: "What is the role of indexes in a database? ",
      a: " Indexes are used for creating database backups",
      b: "  Indexes help in organizing data efficiently, speeding up data retrieval, and improving query performance. ",
      c: "Indexes are used for data encryption. ",
      d: "Indexes are only relevant to non-relational databases. ",
      correct: "b",
    },

    {
      question:
        "Which of the following is an example of a database management system (DBMS)? ",
      a: "SQL",
      b: " NoSQL",
      c: "Oracle Database ",
      d: " Apache Hadoop ",
      correct: "c",
    },
  ],

  QualityAssuranceEngineer: [
    {
      question: "What is the purpose of a test case?",
      a: "Test cases are used to create software documentation. ",
      b: "Test cases are used to report bugs. ",
      c: "Test cases verify expected software behavior. ",
      d: "Test cases are used for code development. ",
      correct: "c",
    },
    {
      question:
        "The difference between verification and validation in software testing? ",
      a: "Verification checks if software meets requirements; validation confirms user needs. ",
      b: "Verification and validation are the same thing. ",
      c: "Verification is only concerned with code quality. ",
      d: " Validation ensures that the software code is error-free.",
      correct: "a",
    },

    {
      question: "What is the concept of test-driven development? ",
      a: "Test-driven development is a technique for reporting software bugs. ",
      b: "Test-driven development means writing tests before code to guide software design. ",
      c: "Test-driven development is a type of performance testing. ",
      d: "Test-driven development focuses solely on user interface testing. ",
      correct: "b",
    },

    {
      question: "What is a test plan? ",
      a: "A test plan is used for reporting software defects for testing. ",
      b: "A test plan outlines the scope, objectives, resources, and schedule for testing.",
      c: "A test plan is a set of test cases for testing. ",
      d: " A test plan is only used in manual testing. ",
      correct: "b",
    },

    {
      question: "The difference between functional and non-functional testing?",
      a: "Functional testing checks if software meets requirements, while non-functional testing assesses performance. ",
      b: " Functional and non-functional testing are the same. ",
      c: "Functional testing is only concerned with code quality while non-functional testing assesses performance. ",
      d: "Functional testing is only concerned with code quality while non-functional testing is used for usability testing. ",
      correct: "a",
    },

    {
      question: "What is a regression test? ",
      a: "A regression test is used to verify code quality.",
      b: "A regression test is the same as a smoke test. ",
      c: "A regression test ensures new code changes don't affect existing functionality. ",
      d: " A regression test is used for performance testing.",
      correct: "c",
    },

    {
      question: "The difference between manual testing and automated testing? ",
      a: "Manual testing is more efficient than automated testing. ",
      b: "Manual testing is only used for unit testing",
      c: "Manual testing is done by human testers using tools, while automated testing uses scripts and tools. ",
      d: "Manual testing is done by human testers, while automated testing uses scripts and tools. ",
      correct: "d",
    },

    {
      question: "What is the role of a test management tool in QA processes?",
      a: "Test management tools are used for managing unit testing while writing code. ",
      b: "Test management tools help managing and reporting bugs and generate bug reports",
      c: "Test management tools help manage test cases, plan and schedule tests, track test execution, and generate test reports ",
      d: "Test management tools are only relevant in dev testing. ",
      correct: "c",
    },

    {
      question:
        "The importance of usability testing in software quality assurance? ",
      a: "Usability testing is not much imporatant in software quality assurance. ",
      b: "Usability testing ensures user-friendly software and enhances overall satisfaction. ",
      c: "Usability testing is used for performance testing. ",
      d: "Usability testing ensures that the software functional requirements are satisfied. ",
      correct: "b",
    },

    {
      question: "Why is a smoke test important? ",
      a: " A smoke test is used to detect software bugs. ",
      b: " A smoke test checks basic software functionality to catch critical issues. ",
      c: "A smoke test quickly checks basic software functionality to catch critical issues early in testing. ",
      d: "A smoke test quickly checks high level software functionality to catch critical issues early in testing. ",
      correct: "c",
    },
  ],

  BusinessAnalyst: [
    {
      question:
        "What is the role of a business analyst in software development projects?",
      a: " Business analysts are responsible for coding software.  ",
      b: "Business analysts design user interfaces. ",
      c: "Business analysts define and document requirements, aligning software with business needs.",
      d: "Business analysts are responsible for system testing. ",
      correct: "c",
    },

    {
      question: "The process of gathering requirements from stakeholders. ",
      a: "Requirement gathering involves writing code.  ",
      b: " Requirement gathering is a one-time activity at the beginning of a project with stakeholders. ",
      c: " Gathering requirements involves interviewing stakeholders and using techniques to document needs.",
      d: " Requirement gathering is the same as Use case designing. ",
      correct: "c",
    },

    {
      question:
        "What is the purpose of a use case diagram?",
      a: "Use case diagrams are used for project scheduling. ",
      b: " Use case diagrams display user interactions with a system's functionality. ",
      c: "Use case diagrams are used for software coding. ",
      d: "Use case diagrams display user interactions. ",
      correct: "b",
    },

    {
      question: "The concept of business process modeling and its benefits. ",
      a: " Business process modeling is used for database design.",
      b: " Business process modeling is a technique for graphic design. ",
      c: "Business process modeling visually represents and optimizes work processes.",
      d: "Business process modeling is only used for code review. ",
      correct: "c",
    },

    {
      question: "How is SWOT analysis used in business analysis? ",
      a: " SWOT analysis is not relevant in business analysis. ",
      b: "SWOT analysis evaluates Strengths, Weaknesses, Opportunities, and Threats, guiding decision-making and strategy. ",
      c: "SWOT analysis evaluates Support, Weaknesses, Opportunities, and Threats, guiding decision-making and strategy.",
      d: "SWOT analysis evaluates Support, Weaknesses, Observations, and Threats, guiding decision-making and strategy.",
      correct: "b",
    },

    {
      question:
        "How do you ensure that requirements are complete and accurate? ",
      a: "Requirements are always complete and accurate. ",
      b: "By engaging stakeholders, and conducting thorough reviews and inspections.",
      c: "By conducting user acceptance testing. ",
      d: "By engaging stakeholders, employing traceability matrices",
      correct: "b",
    },

    {
      question:
        "What is the difference between functional and non-functional requirements? ",
      a: "Functional requirements define how a system should look and feel, while non-functional requirements specify what the system should do. ",
      b: "Functional requirements specify the technical aspects of a system, while non-functional requirements define user interactions. ",
      c: " Functional requirements describe what a system should do, while non-functional requirements specify how it should perform. ",
      d: " Functional requirements and non-functional requirements are the same. ",
      correct: "c",
    },

    {
      question: "The importance of conducting a feasibility study. ",
      a: "Feasibility studies are not relevant in business analysis. ",
      b: "Feasibility studies are used for software testing. ",
      c: "Feasibility studies determine if a project is practical and inform decision-making. ",
      d: " Feasibility studies are only conducted by developers. ",
      correct: "c",
    },

    {
      question:
        "What is the concept of user acceptance testing and its significance?",
      a: "User acceptance testing is used for code development. ",
      b: "User acceptance testing is a form of performance testing. ",
      c: "User acceptance testing is used for graphical design.  ",
      d: "User acceptance testing ensures the system's readiness for production use. ",
      correct: "d",
    },

    {
      question:
        "What are the key components of a business requirements document? ",
      a: " Business requirements documents only include technical specifications. ",
      b: "A business requirements document includes an introduction, scope, objectives, functional and non-functional requirements, assumptions, constraints, and a sign-off section.",
      c: "A business requirements document includes an introduction, scope, objectives,sub objectives, functional and non-functional requirements, constraints, and a sign-off section.",
      d: "A business requirements document includes an introduction, scope, objectives, functional and non-functional requirements, constraints, and a sign-off section.",
      correct: "b",
    },
  ],

  CybersecurityAnalyst: [
    {
      question: "What is/are the main goal(s) of cybersecurity? ",
      a: " The main goal of cybersecurity is to protect the confidentiality of information and systems. ",
      b: " The main goals of cybersecurity are to protect the confidentiality, integrity, and availability of information and systems. ",
      c: "The main goal of cybersecurity is to backup data. ",
      d: "Cybersecurity is only focused on user authentication. ",
      correct: "b",
    },

    {
      question:
        "Explain the difference between symmetric and asymmetric encryption. ",
      a: "Symmetric encryption uses a single key for both encryption and decryption, while asymmetric encryption uses two different keys: a public key for encryption and a private key for decryption. ",
      b: "Symmetric encryption uses two different keys: a public key for encryption and a private key for decryption, while asymmetric encryption uses a single key for both encryption and decryption. ",
      c: "Symmetric encryption and asymmetric encryption are the same.",
      d: "Symmetric encryption is only used for secure email communication.",
      correct: "a",
    },

    {
      question: "What is a firewall, and how does it protect a network? ",
      a: " A firewall is a device used for network performance optimization. ",
      b: "A firewall is a software application for data encryption. ",
      c: "A firewall filters network traffic to protect against threats. ",
      d: " A firewall is used to detect and remove malware.",
      correct: "c",
    },

    {
      question: "Concept of vulnerability assessment in cybersecurity.",
      a: " Vulnerability assessment is used to encrypt data. ",
      b: "Vulnerability assessment identifies and prioritizes system vulnerabilities to assess potential security risks",
      c: "Vulnerability assessment is the same as intrusion detection. ",
      d: "Vulnerability assessment is only relevant in physical security. ",
      correct: "b",
    },

    {
      question: "The difference between antivirus and antimalware software. ",
      a: "Antivirus and antimalware software are the same.",
      b: "Antivirus software is used for hardware diagnostics, while antimalware software focuses on software diagnostics.",
      c: "Antivirus software focuses on viruses, while antimalware protects against a wide range of malicious software. ",
      d: "Antivirus software is only concerned with network security. ",
      correct: "c",
    },

    {
      question:
        "The steps involved in incident response during a cybersecurity breach. ",
      a: "Incident response involves preparation, identification, containment, recovery, and learning",
      b: "Incident response involves preparation, identification, containment, eradication, recovery, and learning",
      c: "Incident response involves preparation, identification,containment, eradication, and recovery.",
      d: "Incident response is the same as vulnerability assessment. ",
      correct: "b",
    },

    {
      question:
        "Which of the following is a common authentication factor used in two-factor authentication (2FA)? ",
      a: "Username and password. ",
      b: "Username and email address. ",
      c: "Username and phone number ",
      d: "Username and date of birth. ",
      correct: "a",
    },
    {
      question:
        "Which of the following is an example of a social engineering attack?",
      a: "Installing antivirus software. ",
      b: " Conducting a vulnerability assessment. ",
      c: "Phishing, where an attacker tricks a person into revealing sensitive information. ",
      d: "Running a firewall. ",
      correct: "c",
    },
    {
      question: "What is the role of encryption in cybersecurity?",
      a: " Encryption is used for hardware diagnostics. ",
      b: " Encryption ensures that all network traffic is recorded and monitored. ",
      c: " Encryption secures data and allows access with a decryption key. ",
      d: " Encryption is used for vulnerability assessment.",
      correct: "c",
    },
    {
      question:
        "What is the difference between a virus and a worm in the context of cybersecurity? ",
      a: "Viruses and worms are the same. ",
      b: "A virus attaches to files, while a worm self-replicates through networks. ",
      c: "A virus is a type of hardware device, while a worm is a software application ",
      d: "Viruses and worms are both used for network optimization. ",
      correct: "b",
    },
  ],

  ProjectManager: [
    {
      question: " What are the key responsibilities of a project manager?  ",
      a: " Project managers are responsible for software development.",
      b: "A project manager plans, schedules, manages resources, handles risks, and communicates with stakeholders. ",
      c: " Project managers are primarily responsible for graphic design.",
      d: " Project managers are responsible for quality assurance.",
      correct: "b",
    },
    {
      question: " Describe the stages of the project management life cycle. ",
      a: "The project management life cycle involves initiation, planning, execution, monitoring, and upgrading. ",
      b: "The project management life cycle involves initiation, planning, execution, monitoring, and replacement. ",
      c: "The project management life cycle only has two stages: planning and execution. ",
      d: "The project management life cycle involves initiation, planning, execution, monitoring, and closure stages. ",
      correct: "d",
    },
    {
      question:
        "How do you create a project schedule and manage dependencies?  ",
      a: "Project schedules are not necessary in project management. ",
      b: "Project schedules are created using a crystal ball to predict project timelines. ",
      c: "Project schedules are made by identifying tasks, estimating durations, and managing dependencies with software. ",
      d: "Project schedules are created by conducting stakeholder meetings. ",
      correct: "c",
    },
    {
      question: " What are the benefits of Agile methodology? ",
      a: "Agile benefits: adaptability, collaboration, faster delivery, customer satisfaction.  ",
      b: "Agile methodology is used in project management for only client satisfaction.  ",
      c: "Agile benefits: extensive documentation,fragmented output  ",
      d: "Agile methodology is only used for large projects. ",
      correct: "b",
    },
    {
      question: "What information should be included in a project charter?  ",
      a: " A project charter includes only the project manager's contact information. ",
      b: " A project charter outlines project objectives, scope, stakeholders, roles, and timeline. ",
      c: "A project charter is not relevant in project management. ",
      d: "A project charter includes detailed technical specifications. ",
      correct: "b",
    },
    {
      question:
        "What is the importance of communication in project management?  ",
      a: "Communication is not important in project management. ",
      b: "Communication is the same as project scheduling. ",
      c: " Communication in project management is solely for marketing purposes. ",
      d: "Effective communication keeps stakeholders informed and engaged.  ",
      correct: "d",
    },
    {
      question: " What is the waterfall method?",
      a: " The waterfall method is a project management technique for managing water resources.",
      b: "The waterfall method is a linear and sequential software development approach. ",
      c: "The waterfall method is a form of stakeholder engagement. ",
      d: "The waterfall method is the same as the Agile methodology. ",
      correct: "b",
    },
    {
      question: " What are the qualities and skills of a project manager? ",
      a: "A project manager should possess leadership, communication, time management, problem-solving, and risk management skills. ",
      b: "A project manager should possess leadership, user acceptance testing ability, time management, and risk management skills.",
      c: "Project managers only need risk managing expertise. ",
      d: "A project manager should possess leadership in requirement gathering, communication, time management and problem-solving. ",
      correct: "a",
    },
    {
      question: "What is a project status report? ",
      a: " A project status report is used for coding.",
      b: " A project status report summarizes a project's progress, milestones, challenges, and future activities ",
      c: " A project status report is only relevant in marketing. ",
      d: " A project status report is the same as a project charter.",
      correct: "b",
    },
    {
      question: "What is a scrum?  ",
      a: "Scrum is a type of project management software.",
      b: " Scrum is a traditional project management approach.",
      c: "Scrum is an Agile framework for iterative software project management ",
      d: " Scrum is a form of quality assurance. ",
      correct: "c",
    },
  ],
};

export default function QuizHolder(props) {
  const [start, setStart] = useState(false);
  const [exit, setExit] = useState(false);
  const [correct, setCorrect] = useState(0);

  return (
    <QuizContext.Provider
      value={{
        start,
        exit,
        setStart,
        setExit,
        quizSets,
        correct,
        setCorrect,
      }}
    >
      {props.children}
    </QuizContext.Provider>
  );
}

export { QuizContext };
