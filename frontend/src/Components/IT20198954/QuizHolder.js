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
      c: "Feature selection is the process of choosing the most relevant features from a dataset to improve model performance.",
      d: "Feature selection is only applicable in supervised learning..",
      correct: "c",
    },

    {
      question: "What is the purpose of cross-validation in model evaluation?",
      a: "Cross-validation is used to train models on larger datasets..",
      b: "Cross-validation helps prevent overfitting by assessing a model's performance on different data subsets..",
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
      b: "Ensemble learning combines predictions from multiple models to improve performance and reduce overfitting..",
      c: "  Ensemble learning is only used in regression problems",
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
      a: " Bagging trains multiple models independently and combines their predictions through voting or averaging",
      b: " Bagging focuses on reducing bias and improving model performance.",
      c: "Bagging is a sequential process, giving more weight to misclassified instances.",
      d: " Bagging is less prone to overfitting.",
      correct: "a",
    },
  ],

  SoftwareEngineer: [
    {
      question: "What is polymorphism? D",
      a: "the process of converting code from one programming language to another",
      b: "the ability of an object to take on many forms",
      c: "the practice of writing efficient and optimized code",
      d: "the process of encrypting sensitive data in software applications",
      correct: "b",
    },
    {
      question: "Difference between synchronous and asynchronous programming?",
      a: "Synchronous programming allows for parallel execution, while asynchronous programming executes tasks sequentially.",
      b: "Synchronous programming requires blocking the execution until a task is completed, while asynchronous programming allows for non-blocking execution.",
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
      a: "Requirements gathering, design, implementation, testing, deployment, and maintenance.",
      b: "Planning, coding, testing, and documentation",
      c: "Analysis, coding, testing, and deployment",
      d: "Design, coding, testing, and maintenance.",
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
      b: "Git allows multiple developers to collaborate on a project and merge their changes seamlessly.",
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
      b: "TCP provides reliable, connection-oriented data delivery, while UDP offers connectionless, unreliable data transmission.",
      c: "TCP is used exclusively for video streaming.",
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
      b: "Network load balancing involves distributing network traffic across multiple servers to optimize performance and reliability.",
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
      c: "DevOps is a set of practices that combines software development and IT operations to deliver software more rapidly and reliably. ",
      d: "DevOps is an operating system for software development. ",
      correct: "c",
    },

    {
      question: "The concept of infrastructure as code and its benefits.",
      a: "Infrastructure as code is a method for storing user data.",
      b: "Infrastructure as code is a practice of managing infrastructure using manual processes.",
      c: "Infrastructure as code treats infrastructure provisioning and management as code, allowing for automation, versioning, and scalability.",
      d: "Infrastructure as code is only applicable in virtualization.",
      correct: "c",
    },

    {
      question:
        "The role of configuration management tools in DevOps practices.",
      a: " Configuration management tools are used for software development only.",
      b: "Configuration management tools help in managing and automating infrastructure and application configuration, ensuring consistency and reliability in DevOps environments. ",
      c: "Configuration management tools are only relevant in traditional waterfall project management. ",
      d: "Configuration management tools are used exclusively for monitoring. ",
      correct: "b",
    },

    {
      question:
        "What is containerization, and how is it different from virtualization? ",
      a: "Containerization is a technique for virtualizing hardware resources. ",
      b: " Containerization and virtualization are identical concepts",
      c: "Containerization involves packaging applications and their dependencies into containers, allowing for efficient and lightweight deployment, whereas virtualization emulates entire virtual machines. ",
      d: "Containerization is used only in legacy IT systems. ",
      correct: "c",
    },

    {
      question: "The concept of monitoring and alerting in DevOps. ",
      a: "Monitoring and alerting are not relevant in DevOps practices. ",
      b: " Monitoring involves continuously observing the performance of applications and infrastructure, while alerting triggers notifications based on predefined thresholds or events. ",
      c: "Monitoring is the same as logging. ",
      d: "Monitoring and alerting are used solely for security purposes.",
      correct: "b",
    },

    {
      question:
        "What is the difference between orchestration and configuration management tools?",
      a: "Orchestration and configuration management tools are the same. ",
      b: "Orchestration tools focus on automating workflows and coordinating tasks, while configuration management tools manage and automate infrastructure and application configuration.",
      c: "Configuration management tools are used for managing code repositories. ",
      d: "Orchestration tools are used only in traditional project management.",
      correct: "b",
    },

    {
      question:
        "How would you ensure high availability and scalability in a DevOps environment? ",
      a: "High availability and scalability are not important in DevOps.",
      b: "By manually scaling resources when needed.",
      c: "Through automation, redundancy, load balancing, and monitoring to ensure resources can handle increased demand and maintain service availability. ",
      d: "By reducing the number of servers in the environment.",
      correct: "c",
    },

    {
      question: "The concept of continuous monitoring in DevOps practices.",
      a: "Continuous monitoring is a one-time activity performed at the end of the software development process.",
      b: "Continuous monitoring is the same as manual testing.",
      c: "Continuous monitoring involves real-time observation and analysis of systems and applications to detect and respond to issues proactively. ",
      d: " Continuous monitoring is not applicable in DevOps. ",
      correct: "c",
    },

    {
      question:
        "What is the purpose of continuous integration and continuous deployment (CI/CD) in software development? ",
      a: " CI/CD is a type of software testing. ",
      b: "CI/CD aims to slow down the software development process. ",
      c: " CI/CD automates the integration, testing, and deployment of code changes to accelerate software delivery and improve quality.",
      d: "CI/CD is only used in manual software development processes.",
      correct: "c",
    },

    {
      question: "What are the key principles of DevOps? ",
      a: "DevOps principles focus on individual coding practices.",
      b: "DevOps principles include collaboration, automation, measurement, and sharing (CAMS), as well as a focus on culture, automation, measurement, and sharing. ",
      c: "DevOps principles are limited to software development only. ",
      d: "DevOps principles emphasize isolation of development and operations teams. ",
      correct: "b",
    },
  ],

  UiUxEngineer: [
    {
      question:
        " What is the difference between user interface (UI) design and user experience (UX) design?",
      a: "UI design focuses on the aesthetics and layout of the interface, while UX design deals with the overall user journey and satisfaction. ",
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
      b: "Responsive web design is a practice of creating websites that adapt to different screen sizes and devices, improving the user experience.",
      c: "Responsive web design focuses on optimizing web content for search engines. ",
      d: " Responsive web design is only relevant for desktop computers. ",
      correct: "b",
    },

    {
      question:
        "What are the steps involved in creating a user-centered design?",
      a: "User-centered design involves understanding user needs, creating design solutions, and testing those solutions with users to gather feedback and iterate. ",
      b: "User-centered design consists of sketching ideas and implementing them without user input.",
      c: "User-centered design focuses solely on visual elements. ",
      d: "User-centered design involves copying designs from popular websites.",
      correct: "a",
    },

    {
      question:
        "What are the principles of usability and accessibility in UI/UX design?",
      a: "Usability focuses on making designs visually appealing, while accessibility ensures that designs are responsive ",
      b: " Usability emphasizes making designs efficient, effective, and satisfying for users, while accessibility focuses on making designs usable by people with disabilities.",
      c: "Usability and accessibility are the same concept ",
      d: "Usability is only concerned with technical aspects ",
      correct: "b",
    },

    {
      question: "The purpose of prototyping in the design process? ",
      a: "Prototyping is used to create the final design of a website or application. ",
      b: " Prototyping is only relevant in print design.",
      c: "Prototyping helps in visualizing and testing the functionality and layout of a design before implementation.",
      d: "Prototyping is used for documenting design specifications. ",
      correct: "c",
    },

    {
      question:
        "Explain the importance of visual hierarchy in interface design. ",
      a: " Visual hierarchy is not relevant in interface design.",
      b: "Visual hierarchy helps users understand the order of importance of elements on a page, guiding their attention and interaction. ",
      c: "Visual hierarchy is only important for text-based content. ",
      d: "Visual hierarchy focuses on color selection in design. ",
      correct: "b",
    },

    {
      question: "What is the role of A/B testing in UI/UX design? ",
      a: "A/B testing is used for creating wireframes. ",
      b: "A/B testing involves comparing two or more design variations to determine which one performs better with users.",
      c: "A/B testing is only used for backend development. ",
      d: "A/B testing is a form of usability testing.",
      correct: "b",
    },

    {
      question: "What is the role of personas in UI/UX design?",
      a: " Personas are used for documenting project requirements ",
      b: " Personas are fictional representations of users, helping designers understand and empathize with the target audience.",
      c: "Personas are used for coding and programming. ",
      d: "Personas are only used in marketing.",
      correct: "b",
    },

    {
      question:
        "How can UI/UX design contribute to a positive user experience? ",
      a: " UI/UX design is not relevant to user experience ",
      b: " UI/UX design focuses solely on aesthetics",
      c: "UI/UX design can create intuitive interfaces, improve usability, and enhance overall satisfaction for users. ",
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
      c: "Operating system installation includes loading the OS onto a computer's storage device and configuring settings. ",
      d: "Operating system installation is the same as system updates.",
      correct: "c",
    },

    {
      question:
        "The purpose of system logs and how are they used in troubleshooting? ",
      a: "System logs are used for tracking user activities only. ",
      b: "System logs are not relevant to troubleshooting ",
      c: " System logs record events and activities on a computer or network and are valuable for diagnosing issues and troubleshooting problems. ",
      d: "System logs are used for storing backups. ",
      correct: "c",
    },

    {
      question:
        "How do you manage user accounts and access control in a network? ",
      a: " User account management is not a concern for system administrators. ",
      b: "Access control involves monitoring system logs.",
      c: "User account management includes creating, modifying, and deleting user accounts, while access control defines who can access specific resources and what permissions they have. ",
      d: "User accounts are automatically managed by the operating system. ",
      correct: "c",
    },

    {
      question: "The concept of system virtualization and its benefits. ",
      a: "System virtualization involves creating physical copies of computer systems. ",
      b: "System virtualization is used exclusively for gaming.",
      c: "System virtualization is a technology that allows multiple virtual machines (VMs) to run on a single physical host, enabling better resource utilization, isolation, and flexibility. ",
      d: "System virtualization is the same as system backups.",
      correct: "c",
    },

    {
      question: "How do you perform system backups and ensure data recovery?",
      a: "System backups are not necessary for data recovery. ",
      b: "Data recovery involves reinstalling the operating system.",
      c: "System backups are created regularly, and data recovery plans are in place to restore data in case of loss or disaster ",
      d: "Data recovery is the same as data deletion.",
      correct: "c",
    },

    {
      question:
        "The concept of high availability and its significance in system administration. ",
      a: "High availability refers to the availability of software updates. ",
      b: "High availability is not a concern for system administrators.",
      c: "High availability is the ability of a system to remain operational and accessible even in the face of hardware or software failures, and it is crucial for ensuring uninterrupted services. ",
      d: "High availability only applies to network security.",
      correct: "c",
    },

    {
      question:
        "The role of system monitoring tools in infrastructure management? ",
      a: "System monitoring tools are used for graphic design. ",
      b: "System monitoring tools are not relevant to infrastructure management.",
      c: "System monitoring tools continuously observe and report on the performance and health of computer systems, networks, and applications. ",
      d: "System monitoring tools are used for system backups.",
      correct: "c",
    },

    {
      question:
        "What is the purpose of system monitoring tools in system administration?",
      a: "System monitoring tools are used for creating user accounts. ",
      b: "System monitoring tools are used for data recovery.",
      c: " System monitoring tools help system administrators detect issues, assess performance, and make informed decisions to optimize system performance and reliability.",
      d: "System monitoring tools are only used for system installation",
      correct: "c",
    },

    {
      question:
        "What is the purpose of system documentation in system administration ",
      a: "System documentation is not necessary in system administration.",
      b: "System documentation is used for marketing purposes.",
      c: "System documentation provides comprehensive records and instructions for system configuration, troubleshooting, and maintenance, helping system administrators manage and support systems effectively. ",
      d: "System documentation is used for user account management.",
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
      a: "Relational databases store data in tables with fixed schemas, while non-relational databases use flexible schemas and can store data in various formats.",
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
      b: "Database transaction management ensures that database operations are executed in a way that maintains data consistency and integrity, following the ACID properties (Atomicity, Consistency, Isolation, Durability). ",
      c: "Transaction management is only used for database backups. ",
      d: "Transaction management is the same as database normalization. ",
      correct: "b",
    },

    {
      question:
        "The role of database monitoring and maintenance in a production environment? ",
      a: "Database monitoring and maintenance are not necessary in a production environment.",
      b: "Database monitoring involves checking database logs, performance, and health to ensure smooth operation, while maintenance includes tasks like optimizing queries, updating software, and managing backups.  ",
      c: "Database monitoring is used for system administration ",
      d: "Database maintenance is only applicable in development environments.",
      correct: "b",
    },

    {
      question: "What is the purpose of database normalization? ",
      a: " Database normalization is used for data encryption",
      b: "  Database normalization is the process of optimizing database performance. ",
      c: "Database normalization is used to eliminate data redundancy and improve data integrity by organizing data into separate tables. ",
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
      c: "Test cases define specific conditions and steps to verify that a software application behaves as expected. ",
      d: "Test cases are used for code development. ",
      correct: "c",
    },
    {
      question:
        "The difference between verification and validation in software testing? ",
      a: "Verification ensures that the software meets the specified requirements, while validation confirms that the software meets user needs and expectations ",
      b: "Verification and validation are the same thing. ",
      c: "Verification is only concerned with code quality. ",
      d: " Validation ensures that the software code is error-free.",
      correct: "a",
    },

    {
      question: "What is the concept of test-driven development? ",
      a: "Test-driven development is a technique for reporting software bugs. ",
      b: "Test-driven development involves writing tests before writing code, with the goal of driving the software design based on test requirements ",
      c: "Test-driven development is a type of performance testing. ",
      d: "Test-driven development focuses solely on user interface testing. ",
      correct: "b",
    },

    {
      question: "What is a test plan? ",
      a: "A test plan is used for reporting software defects. ",
      b: "A test plan is a document that outlines the scope, objectives, resources, and schedule for a testing project.",
      c: "A test plan is a set of test cases. ",
      d: " A test plan is only used in manual testing. ",
      correct: "b",
    },

    {
      question: "The difference between functional and non-functional testing?",
      a: "Functional testing ensures that the software meets specified requirements, while non-functional testing focuses on how the software performs. ",
      b: " Functional and non-functional testing are the same. ",
      c: "Functional testing is only concerned with code quality. ",
      d: " Non-functional testing is used for usability testing. ",
      correct: "a",
    },

    {
      question: "What is a regression test? ",
      a: "A regression test is used to verify code quality ",
      b: "A regression test is the same as a smoke test. ",
      c: "A regression test checks whether new code changes have affected existing functionality and ensures that no new defects have been introduced. ",
      d: " A regression test is used only for performance testing",
      correct: "c",
    },

    {
      question: "The difference between manual testing and automated testing? ",
      a: "Manual testing is more efficient than automated testing. ",
      b: "Manual testing is only used for unit testing",
      c: "Manual testing involves testers executing test cases manually, while automated testing uses scripts and tools to execute tests. ",
      d: " Manual testing is used for code development. ",
      correct: "c",
    },

    {
      question: "What is the role of a test management tool in QA processes?",
      a: "Test management tools are used for writing code",
      b: "Test management tools are used for reporting bugs",
      c: "Test management tools help manage test cases, plan and schedule tests, track test execution, and generate test reports ",
      d: "Test management tools are only relevant in manual testing. ",
      correct: "c",
    },

    {
      question:
        "The importance of usability testing in software quality assurance? ",
      a: "Usability testing is not relevant in software quality assurance. ",
      b: "Usability testing helps ensure that the software is user-friendly and meets user expectations, ultimately improving user satisfaction and the overall quality of the software. ",
      c: "Usability testing is used for performance testing. ",
      d: "Usability testing is only relevant for code review. ",
      correct: "b",
    },

    {
      question: "Why is a smoke test important? ",
      a: " A smoke test is used to detect software bugs. ",
      b: " A smoke test is not important in software testing ",
      c: "A smoke test is a quick, preliminary test to check if the basic functionality of the software is working, helping identify critical issues early in the testing process. ",
      d: "A smoke test is the same as regression testing. ",
      correct: "c",
    },
  ],

  BusinessAnalyst: [
    {
      question:
        "What is the role of a business analyst in software development projects?",
      a: " Business analysts are responsible for coding software.  ",
      b: "Business analysts design user interfaces. ",
      c: "Business analysts bridge the gap between business stakeholders and the development team by defining and documenting business requirements, ensuring that the software aligns with business needs. ",
      d: "Business analysts are responsible for system testing. ",
      correct: "c",
    },

    {
      question: "The process of gathering requirements from stakeholders. ",
      a: "Requirement gathering involves writing code.  ",
      b: " Requirement gathering is a one-time activity at the beginning of a project. ",
      c: " Requirement gathering includes activities such as interviewing stakeholders, conducting workshops, and using various techniques to elicit, analyze, and document requirements",
      d: " Requirement gathering is the same as software testing ",
      correct: "c",
    },

    {
      question:
        "What is the purpose of a use case diagram, and how is it created?",
      a: "Use case diagrams are used for project scheduling. ",
      b: " Use case diagrams illustrate the user interactions with a system, showing how users interact with the system's functionality, and are created using graphical notation. ",
      c: "Use case diagrams are used for software coding. ",
      d: "Use case diagrams are created using programming languages ",
      correct: "b",
    },

    {
      question: "The concept of business process modeling and its benefits. ",
      a: " Business process modeling is used for database design.",
      b: " Business process modeling is a technique for graphic design. ",
      c: "Business process modeling involves creating visual representations of business processes to analyze, optimize, and document how work is done, improving efficiency and effectiveness. ",
      d: "Business process modeling is only used for code review. ",
      correct: "c",
    },

    {
      question: "How is SWOT analysis used in business analysis? ",
      a: " SWOT analysis is not relevant in business analysis. ",
      b: "SWOT analysis is used to develop software requirements. ",
      c: " SWOT analysis helps assess the Strengths, Weaknesses, Opportunities, and Threats of a business or project, aiding in decision-making and strategy development.",
      d: "SWOT analysis is used for software testing.",
      correct: "c",
    },

    {
      question:
        "How do you ensure that requirements are complete and accurate? ",
      a: "Requirements are always complete and accurate. ",
      b: " By conducting user acceptance testing. ",
      c: "By involving stakeholders in the requirement validation process, using traceability matrices, and performing thorough reviews and inspections. ",
      d: " By developing detailed project schedules. ",
      correct: "c",
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
      c: "Feasibility studies assess the viability and practicality of a project or solution, helping organizations make informed decisions about whether to proceed with a project. ",
      d: " Feasibility studies are only conducted by developers. ",
      correct: "c",
    },

    {
      question:
        "What is the concept of user acceptance testing and its significance?",
      a: "User acceptance testing is used for code development. ",
      b: " User acceptance testing is a form of performance testing. ",
      c: "User acceptance testing involves evaluating whether a system meets user requirements and is ready for production use, with users performing real-world tests. ",
      d: "User acceptance testing is used for graphical design. ",
      correct: "c",
    },

    {
      question:
        "What are the key components of a business requirements document? ",
      a: " Business requirements documents only include technical specifications. ",
      b: " Key components of a business requirements document typically include an introduction, scope, objectives, functional and non-functional requirements, assumptions, constraints, and a sign-off section.",
      c: " Business requirements documents are used for project scheduling. ",
      d: "Business requirements documents are the same as project plans. ",
      correct: "b",
    },
  ],

  CybersecurityAnalyst: [
    {
      question: "What are the main goals of cybersecurity? ",
      a: " Cybersecurity aims to make software applications run faster. ",
      b: " The main goals of cybersecurity are to protect the confidentiality, integrity, and availability of information and systems. ",
      c: "Cybersecurity is primarily concerned with data backup. ",
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
      c: "A firewall is a network security device that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. ",
      d: " A firewall is used to detect and remove malware.",
      correct: "c",
    },

    {
      question: "Concept of vulnerability assessment in cybersecurity.",
      a: " Vulnerability assessment is used to encrypt data. ",
      b: " Vulnerability assessment is a process of identifying, evaluating, and prioritizing vulnerabilities in a system, network, or application to determine potential security risks. ",
      c: "Vulnerability assessment is the same as intrusion detection. ",
      d: "Vulnerability assessment is only relevant in physical security. ",
      correct: "b",
    },

    {
      question: "The difference between antivirus and antimalware software. ",
      a: " Antivirus and antimalware software are the same.",
      b: " Antivirus software is used for hardware diagnostics, while antimalware software focuses on software diagnostics.",
      c: "Antivirus software specifically targets viruses, while antimalware software provides broader protection against various types of malicious software, including viruses, worms, Trojans, and more. ",
      d: "Antivirus software is only concerned with network security. ",
      correct: "c",
    },

    {
      question:
        "The steps involved in incident response during a cybersecurity breach. ",
      a: "Incident response is not relevant in cybersecurity. ",
      b: "Key steps in incident response include preparation, identification, containment, eradication, recovery, and lessons learned. ",
      c: "Incident response involves shutting down the entire network.",
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
      c: " Encryption protects sensitive data by converting it into a secure format that can only be accessed by authorized parties with the decryption key. ",
      d: " Encryption is used for vulnerability assessment.",
      correct: "c",
    },
    {
      question:
        "What is the difference between a virus and a worm in the context of cybersecurity? ",
      a: "Viruses and worms are the same. ",
      b: " A virus is a type of malware that spreads by attaching itself to other files or programs, while a worm is a self-replicating type of malware that spreads independently through a network. ",
      c: "A virus is a type of hardware device, while a worm is a software application ",
      d: "Viruses and worms are both used for network optimization. ",
      correct: "b",
    },
  ],

  ProjectManager: [
    {
      question: " What are the key responsibilities of a project manager?  ",
      a: " Project managers are responsible for software development.",
      b: "  Key responsibilities of a project manager include project planning, scheduling, resource management, risk management, and stakeholder communication. ",
      c: " Project managers are primarily responsible for graphic design.",
      d: " Project managers are responsible for quality assurance.",
      correct: "b",
    },
    {
      question: " Describe the stages of the project management life cycle. ",
      a: "The project management life cycle consists of a single stage. ",
      b: "The project management life cycle typically includes initiation, planning, execution, monitoring and controlling, and closure stages. ",
      c: "The project management life cycle only has two stages: planning and execution. ",
      d: "The project management life cycle has no defined stages. ",
      correct: "b",
    },
    {
      question:
        "How do you create a project schedule and manage dependencies?  ",
      a: "Project schedules are not necessary in project management. ",
      b: " Project schedules are created using a crystal ball to predict project timelines. ",
      c: "Project schedules are created by identifying project tasks, estimating their durations, and defining dependencies between tasks, which can be managed using project management software. ",
      d: " Project schedules are created by conducting stakeholder meetings. ",
      correct: "c",
    },
    {
      question: " What are the benefits of Agile methodology? ",
      a: "Agile methodology is not used in project management. ",
      b: " Benefits of Agile include adaptability to changing requirements, improved collaboration, faster delivery of increments, and enhanced customer satisfaction.",
      c: " Agile methodology focuses on extensive documentation ",
      d: "Agile methodology is only used for large projects. ",
      correct: "b",
    },
    {
      question: "What information should be included in a project charter?  ",
      a: " A project charter includes only the project manager's contact information. ",
      b: "A project charter typically includes project objectives, scope, stakeholders, roles and responsibilities, and high-level project timeline. ",
      c: "A project charter is not relevant in project management. ",
      d: "A project charter includes detailed technical specifications. ",
      correct: "b",
    },
    {
      question:
        "What is the importance of communication in project management?  ",
      a: "Communication is not important in project management. ",
      b: "Effective communication ensures that project stakeholders are kept informed, aligned, and engaged, helping to prevent misunderstandings and resolve issues. ",
      c: " Communication in project management is solely for marketing purposes. ",
      d: "Communication is the same as project scheduling. ",
      correct: "b",
    },
    {
      question: " What is the waterfall method?",
      a: " The waterfall method is a project management technique for managing water resources.",
      b: "The waterfall method is a software development approach that follows a linear and sequential process, where each phase must be completed before the next one begins. ",
      c: "The waterfall method is a form of stakeholder engagement. ",
      d: "The waterfall method is the same as the Agile methodology. ",
      correct: "b",
    },
    {
      question: " What are the qualities and skills of a project manager? ",
      a: "Project managers do not require any specific qualities or skills. ",
      b: "Qualities and skills of a project manager may include leadership, communication, time management, problem-solving, and risk management.",
      c: "Project managers only need technical expertise. ",
      d: "Project managers are primarily responsible for coding. ",
      correct: "b",
    },
    {
      question: "What is a project status report? ",
      a: "  A project status report is used for coding.",
      b: "A project status report is a document that provides an overview of a project's progress, including key milestones, achievements, challenges, and upcoming activities. ",
      c: " A project status report is only relevant in marketing. ",
      d: " A project status report is the same as a project charter.",
      correct: "b",
    },
    {
      question: "What is a scrum?  ",
      a: "Scrum is a type of project management software.",
      b: " Scrum is a traditional project management approach.",
      c: "Scrum is an Agile framework used for managing and delivering software projects in iterative and incremental cycles, known as sprints. ",
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
