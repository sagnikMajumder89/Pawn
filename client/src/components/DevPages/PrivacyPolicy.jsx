
import MiniDrawer from "../Home/Minidrawer";

function ContactUs() {
    return (
        <div className='bg-background w-full h-full flex flex-row'>
            <MiniDrawer />
            <div className="flex flex-col items-start justify-start w-full px-20 py-28 gap-4">
                <span className="flex flex-col gap-3">
                    <p className="font-bold text-3xl"> Privacy Policy</p>
                    <p className="font-light text-md">Effective Date: 01 / 01 / 2024</p>
                    <p> This Privacy Policy describes how PawnHub.com ("Website", "we", "us", or "our") collects, uses, and discloses your personal information when you visit or use our website.</p>
                    <p className="font-semibold text-xl"> 1. Information We Collect</p>
                    <p className="text-md"> We collect the following types of information from you:</p>

                    <p> Personal Information: This includes information that can be used to identify you directly or indirectly, such as your name, email address, username, password, phone number, country, and IP address.
                        Game Data: This includes information about your chess games played on the Website, such as opponent usernames, match results, move history, and timestamps.
                        Tracking Data: We may use cookies and other tracking technologies to collect information about your activity on the Website, such as the pages you visit, the links you click, and the time you spend on each page.</p>
                    <p className="font-semibold text-xl">  2. How We Use Your Information </p>

                    <p> We use your information for the following purposes:</p>
                    <p>
                        To provide and operate the Website and deliver its services, such as facilitating chess games, providing statistics, and maintaining leaderboards.
                        To personalize your experience and preferences on the Website.
                        To send you important information about the Website, such as game invitations, notifications, and support messages.
                        To improve the Website and develop new features and services.
                        To analyze your use of the Website for statistical purposes and to better understand our users.
                        To comply with our legal obligations and enforce our Terms of Service.
                    </p>
                    <p className="font-semibold text-xl">
                        3. Sharing Your Information
                    </p>
                    We will not share your personal information with third-party companies for their marketing purposes without your consent. We may share your information with third-party service providers who help us operate the Website and provide its services, such as web hosting providers, data analytics providers, and customer support providers. These third-party service providers are required to protect your information and are restricted from using it for any other purpose than providing services to us.

                    We may also disclose your information if required by law or if we believe it is necessary to protect the rights, property, or safety of ourselves, our users, or the public.

                    <p className="font-semibold text-xl">
                        4. Data Retention
                    </p>
                    We will retain your Personal Information for as long as your account is active, and for a reasonable period thereafter to comply with our legal obligations, resolve disputes, and enforce our agreements.
                    <p className="font-semibold text-xl">
                        5. Your Choices
                    </p>
                    You have the right to access, correct, or delete your personal information. You can also object to the processing of your personal information or withdraw your consent at any time. To exercise these rights, please contact us at [Your Email Address].
                    <p className="font-semibold text-xl">
                        6. Children's Privacy
                    </p>
                    Our Website is not intended for children under the age of 13. We do not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
                    <p className="font-semibold text-xl">
                        7. Security
                    </p>
                    We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, we cannot guarantee the absolute security of your information.
                    <p className="font-semibold text-xl">
                        8. International Transfers
                    </p>
                    Your information may be transferred to and processed in countries other than your own. When we transfer your information to other countries, we will take steps to ensure that your information is protected in accordance with this Privacy Policy.
                    <p className="font-semibold text-xl">
                        9. Changes to this Privacy Policy
                    </p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Website. You are advised to review this Privacy Policy periodically for any changes.
                    <p className="font-semibold text-xl">
                        10. Contact Us
                    </p>
                    <p className="pb-6">
                        If you have any questions about this Privacy Policy, please contact us at sagnikm183@gmail.com .
                    </p>
                </span>
            </div>
        </div>
    )
}

export default ContactUs