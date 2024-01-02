
import MiniDrawer from "../Home/Minidrawer";
import { contactUsSchema } from "../../schemas"
import { Formik, Form, Field, ErrorMessage } from 'formik';

function ContactUs(props) {
    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log(values);
        // Handle form submission, like sending data to your backend
        setSubmitting(false);
        resetForm();
    };
    return (
        <div className='bg-background w-full h-full flex flex-row'>
            <MiniDrawer />
            <div className="flex flex-col items-start justify-start w-full px-20 py-28 gap-4">
                <span className="text-3xl font-semibold">Contact Us</span>
                <div className="flex flex-row items-start justify-center w-full">
                    <div className="flex flex-col gap-4 justify-center w-full">
                        <span className="text-xl font-light">Get in touch with us</span>
                        <span>
                            Email: <a href="mailto:sagnikm183@gmail.com" className="text-blue-600 hover:text-blue-800">sagnikm183@gmail.com</a>
                        </span>

                        <span>
                            Socials:
                            <div className="flex flex-row gap-4 m-3">
                                <a href="https://www.linkedin.com/in/sagnik-majumder-92345524b" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
                                <a href="https://github.com/sagnikMajumder89" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">GitHub</a>
                            </div>
                        </span>
                    </div>
                    <div className="flex flex-col gap-4 justify-center w-full">
                        <span className="text-xl font-light">Or write to us directly from here:</span>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={contactUsSchema}
                            onSubmit={onSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="flex flex-col gap-4">
                                    <Field type="text" name="name" placeholder="Your Name" className="p-2 border-2 rounded bg-foreground border-border" />
                                    <ErrorMessage name="name" component="div" />

                                    <Field type="email" name="email" placeholder="Your Email" className="p-2 border-2 rounded bg-foreground border-border" />
                                    <ErrorMessage name="email" component="div" />

                                    <Field type="text" name="subject" placeholder="Subject" className="p-2 border-2 rounded bg-foreground border-border" />
                                    <ErrorMessage name="subject" component="div" />

                                    <Field as="textarea" name="message" placeholder="Your Message" className="p-2 border-2 rounded bg-foreground border-border h-40" />
                                    <ErrorMessage name="message" component="div" />

                                    <button type="submit" disabled={isSubmitting} className="bg-secondary-content text-white p-2 rounded hover:bg-blue-600">
                                        Send Message
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs