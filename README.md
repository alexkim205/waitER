# waitER
One of the biggest causes of crowding and wait times in emergency departments is “boarding,” a term for holding an admitted patient in the ER for hours or even days until an inpatient bed becomes available. Long wait times can affect patient outcomes in various ways: patients may get tired of waiting and leave without receiving medical treatment, especially when resources of the emergency department are overwhelmed. In order to alleviate some of the anxiety and stress associated with the process, we created a web application that aims to bring transparency to patient wait times in the emergency room.

Watch how it works here: [https://vimeo.com/288946324](https://vimeo.com/288946324)

---
### Features

1. **Homepage**: Upon arrival at the ER, the patient recieves a unique user ID used to access their personal homepage, mainly featuring the placement they are currently in the queue along with other supplementary educational information that may be of interest.
2. **Triage page**: (only accessible to admin) Features a series of triage questions used to determine the ESI of that particular patient.
3. **Admin dashboard**: (only accessible to admin) Features a scrollable queue of all patients in line, along with their ID, arrival time, and ESI. The admin is able to add users to the queue using the triage page and to remove users when it is their turn for care. This then alerts the patient through the homepage. 

*Note*: When any update occurs, all pages are updated to reflect the latest changes. 

---
### Running this program

1. Make sure node and npm are installed on the system.
2. Install all node modules with `npm install`.
3. Build the application with `npm run build`.
4. Run the application with `npm run start`.
5. Access the triage page at `localhost:8080/triage` and add a patient to the queue.
6. After adding the patient to the queue, the page will display a link to the patient's individual page along with a link to the dashboard.
