# Design Decisions


## 1. Human-Centric Design Approach for Cloud Professionals

Decision: All system components must respect human autonomy and agency, particularly for technical cloud professionals.

Context: While we draw inspiration from Kubernetes for orchestrating resources, we recognize that humans are not objects to be scheduled like containers. Cloud architects, data engineers, and Kubernetes administrators must maintain control over their career development within the rapidly evolving cloud services landscape.

Consequences:

The system will use incentives rather than mandates (e.g., bonuses for first 10 employees who complete new cloud certifications)
All skill recommendations will be opt-in, allowing engineers to choose development paths aligned with their interests
Transparency in how recommendations are generated, particularly regarding ZenDesk ticket data and peer reviews
Multiple pathways will always be offered when possible, recognizing diverse specialization options within cloud services
System success metrics must include employee satisfaction alongside ticket resolution metrics and client feedback
Recognition of both formal certifications and practical experience as valid skill indicators

## 2. Conversational Interface Priority

Decision: Natural language will be the primary interface for employee interaction.

Context: Engineers should be able to ask questions like "What should I be studying right now?" and receive personalized, contextually relevant answers.

Consequences:

Investment in robust NLP capabilities
Design pattern favoring conversation over form-based input
Progressive improvement in understanding domain-specific terminology
Focus on context retention across conversation sessions

## 3. Event-Driven Architecture

Decision: The system will follow an event-driven architecture pattern.

Context: Demand signals arrive continuously from multiple sources and should propagate through the system in real-time.

Consequences:

Components will communicate via events
System design will focus on event producers and consumers
Event sourcing may be used for critical data streams
Event replay capabilities for debugging and analysis

## 4. Microservices Approach

Decision: The system will be built using a microservices architecture.

Context: Different components of the system have different scaling needs and development cycles.

Consequences:

Services will be independently deployable
Service boundaries will align with business domains
API contracts between services will be clearly defined
Service discovery and orchestration will be required

## 5. Continuous Feedback Loop

Decision: The system will incorporate explicit feedback mechanisms.

Context: To "close the loop" on skill acquisition, the system needs to track outcomes and adjust recommendations accordingly.

Consequences:

Feedback collection from both employees and team leads
A/B testing of recommendation strategies
Regular reassessment of recommendation effectiveness
Continuous learning from system performance data

## 6. Privacy and Data Protection

Decision: Employee skill and career goal data must be handled with appropriate privacy controls.

Context: The system will contain sensitive information about employee capabilities and career aspirations.

Consequences:

Clear data access policies
Anonymization where appropriate
Opt-out options for sensitive data collection
Compliance with relevant privacy regulations

## 7. Documentation as Code

Decision: System documentation will be treated as code.

Context: Documentation needs to evolve alongside the system architecture.

Consequences:

MkDocs implementation
Documentation integrated into CI/CD pipeline
Documentation review as part of code review process
Automated validation of documentation links and references

## 8. ZenDesk-Centric Integration

Decision: ZenDesk will be the primary source of demand signal data for technical skills.

Context: DoIT's service delivery is heavily mediated through the ZenDesk ticketing system, making it the most accurate reflection of current technical skill demands.

Consequences:

Deep integration with ZenDesk API for real-time ticket analysis
Development of a taxonomy mapping ZenDesk ticket categories to specific technical skills
Historical analysis of ticket resolution patterns to identify emerging skill needs
Privacy controls to ensure ticket analysis respects client confidentiality
Balanced consideration of ticket volume against strategic importance

## 9. Multi-Department Skill Orchestration

Decision: The system must accommodate the different skill needs across cloud support, FinOps, and project-based services.

Context: DoIT provides services across multiple departments with different service delivery models and skill requirements.

Consequences:

Department-specific demand signal weighting
Customized recommendation algorithms for different service types
Cross-department skill transferability analysis
Balanced incentive structures that don't favor one department over others
Unified skill taxonomy that works across all service delivery models

## 10. LLM Interface with Model-Context Protocol

Decision: The system will use an LLM as the primary natural language interface and implement the Model-Context Protocol for system integration.

Context: DoIT requires a natural language interface that allows cloud professionals to ask questions about skill development in natural language. The Model-Context Protocol provides a structured approach for integrating LLMs with external systems.

Consequences:

LLM provider agnosticism allowing flexibility in model selection
Implementation of context storage mechanisms for user-specific data
Development of specialized tools for accessing various data sources
Strict security controls on which data sources can be accessed by the LLM
Clear attribution of information sources in responses
Potential for progressive enhancement as LLM technology improves
Need for thoughtful prompt engineering to guide the LLM's interactions

## 11. Contextual Authentication and Authorization

Decision: The system will maintain awareness of user identity and permissions when handling natural language queries.

Context: Different users will have different authorization levels for data access, and responses should be tailored to each user's specific context and permissions.

Consequences:

Integration with existing authentication systems
Persistent identity context throughout conversation sessions
Role-based access controls for different data sources
Fine-grained permission model for data exposure to LLM
Transparent disclosure to users about data access limitations
Personalized responses based on authenticated user identity
Clear distinction between organizational and personal data
This document records important design decisions that must be respected throughout the development of the DoIT Skills Orchestration System.