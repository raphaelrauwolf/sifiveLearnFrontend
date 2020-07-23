
import {
    html, customElement,
} from 'lit-element';

import { BaseViewComponent } from 'Components/Global/BaseViewComponent';

import { getStyles } from './Styles';

/**
 * PrivacyView LitElement
 * template for /privacy-policy
 */
@customElement('privacy-view')
class PrivacyView extends BaseViewComponent {

    /**
     * @return {String} element styles
     */
    static get styles() {

        return super.styles.concat(getStyles(this));

    }

    /**
     * Render function
     * @return {String}  html output
     */
    render() {

        return html`
            <!-- PrivacyView Component -->
            <div class="grid-container">
                <header>
                    <h3>SiFive Learn Site Privacy Policy</h3>
                    <h6><i>Last Revised: August 2, 2019</i></h6>
                    <p>SiFive, Inc. (“SiFive”) is committed to protecting your privacy. We have prepared this Privacy Policy to describe to you our practices regarding the Personal Data (as defined below) we collect from users of our website, located at sifiveacademy.com (the “Site”) and online services (“Services”).</p>
                </header>
                <section>
                    <h5>1. Questions; Contacting SiFive; Reporting Violations.</h5>
                    <p>If you have any questions or concerns or complaints about our Privacy Policy or our data collection or processing practices, or if you want to report any security violations to us, please contact us at the following address or phone number:</p>
                    <p style="padding-top: 25px;">
                        <b>SiFive</b><br />
                        Attn: Privacy Officer <br />
                        1875 South Grant Street, Suite 600 <br />
                        San Mateo, CA 94402 <br />
                        <a href="mailto:privacy@sifive.com ">privacy@sifive.com</a>
                    </p>
                </section>
                <section>
                    <h5>2. User Consent.</h5>
                    <p>By submitting Personal Data through our Site or Services, you agree to the terms of this Privacy Policy and you expressly consent to the collection, use and disclosure of your Personal Data in accordance with this Privacy Policy.</p>
                </section>
                <section>
                    <h5>3. A Note About Children.</h5>
                    <p>We do not intentionally gather Personal Data from visitors who are under the age of 13. If a child under 13 submits Personal Data to SiFive and we learn that the Personal Data is the information of a child under 13, we will attempt to delete the information as soon as possible. If you believe that we might have any Personal Data from a child under 13, please contact us at privacy@sifive.com.</p>
                </section>
                <section>
                    <h5>4. A Note to Users Outside of the United States.</h5>
                    <p>
                    By visiting our Site or using our Services, you acknowledge and agree that your Personal Data may be collected, used, disclosed and otherwise processed for the purposes identified in this Privacy Policy. In addition, your Personal Data may be maintained and processed by SiFive and our third-party service providers and Affiliates in the country in which it was collected and in other countries, including the United States, where laws regarding the processing of Personal Data may be less protective than the laws in your country. While the Personal Data is processed in another jurisdiction it may be accessible by the courts, law enforcement and national security authorities in accordance with the laws in that country. By providing your data or using our Site, Services, you consent to such processing and transfer.
                    </p>
                </section>
                <section>
                    <h5>5. Types of Data We Collect.</h5>
                    <p>
                        “Personal Data” means data that allows someone to identify or contact you, including, for example, your name, address, telephone number, e-mail address, as well as any other non- public information about you that is associated with or linked to any of the foregoing data. “Anonymous Data” means data that is not associated with or linked to your Personal Data; Anonymous Data does not, by itself, permit the identification of individual persons. We collect Personal Data and Anonymous Data, as described below.
                    </p>
                    <h6>(a) Information You Provide to Us.</h6>
                    <p>We may collect Personal Data from you, such as your first and last name, e- mail and mailing addresses, professional title, company name, and password when you create or register an account to log in to our network (“Account”).</p>
                    <p>If you use our Services on your mobile device, we may collect your phone number and the unique device id number.</p>
                    <p>We may retain information on your behalf, such as files and messages that you store using your Account.</p>
                    <p>If you provide us feedback or contact us via e-mail, we may collect your name and e-mail address, as well as any other content included in the e-mail, in order to send you a reply.</p>
                    <p>
                        When you post content (text, documents, photographs, messages, images, videos, slides, comments or any other kind of content that is not your e-mail address) on our Site, the information contained in your posting will be stored in our servers and other users will be able to see it, along with your profile photo and any other information that you choose to make public on your public profile page (“Profile”). The information that you provide in your Profile will be visible to others, including anonymous visitors to the Site.
                    </p>
                    <p>When you post messages on the message boards of our Site, the information contained in your posting will be stored on our servers and other users will be able to see it.</p>
                    <p>We also collect other types of Personal Data that you provide to us voluntarily, such as your operating system and version, product registration number, and other requested information if you contact us via e-mail regarding support for the Services.</p>
                    <p>We may also collect Personal Data at other points in our Site that state that Personal Data is being collected.</p>
                    <h6>(b) Information You Provide to Facebook and other Social Networking Sites.</h6>
                    <p>
                        Social Networking Site (“SNS”) features that may be used on the Site include: (i) allowing registered users to use the Services to access Facebook to interact with friends and to share on Facebook through Wall and friends’ News Feeds; (ii) allowing you, if you are already logged into the Services and Facebook or another SNS, when you click on “Connect with Facebook,” or a similar connection on another SNS, to merge your profiles; and (iii) allowing you, if you are already logged into the Services but not logged into Facebook or another SNS that we support, when you click on “Connect with Facebook,” or a similar connection on another SNS, to enter your SNS credentials or to “Sign Up” for the SNS. When using the new features, you are allowing the Services to access your information and you are agreeing to the Facebook or other SNS’s Terms of Use in your use of the Services. Conversely, if you are not currently registered as a user of the Services, and you click on “Sign in” using Facebook or another SNS that we support, you will first be asked to enter your Facebook or SNS credentials and then be given the option to register for the Services. In this case, we may receive information from Facebook or another SNS to make it easier for you to create an Account on the Site and show our relevant content from your Facebook or SNS friends. Once you register on the Site and connect with Facebook or another SNS, the new features will allow you to automatically post recent activity back to Facebook or the other SNS. Any information that we collect from your Facebook or other SNS account may depend on the privacy settings you have with that SNS, so please consult the SNS’s privacy and data practices. You will have the option to disable Facebook Connect at any time by logging into your Account through the Site and going to settings, “About Me,” “Linked Accounts,” and then unselecting “Facebook.” Further, you will be able to edit privacy settings for the reviews that appear on Facebook, or disconnect your Services activity stream by visiting the Facebook applications settings page.
                    </p>
                    <h6>(c) Information Collected via Technology.</h6>
                    <p>Information Collected by Our Servers. To make our Site and Services more useful to you, our servers (which may be hosted by a third party service provider) collect information from you, including your browser type, operating system, Internet Protocol (“IP”) address (a number that is automatically assigned to your computer when you use the Internet, which may vary from session to session), domain name, and/or a date/time stamp for your visit.</p>
                    <ul>
                        <li>
                            <b>Log Files.</b> As is true of most websites, we gather certain information automatically and store it in log files. This information includes IP addresses, browser type, Internet service provider (“ISP”), referring/exit pages, operating system, date/time stamp, and clickstream data. We use this information to analyze trends, administer the Site, track users’ movements around the Site, gather demographic information about our user base as a whole, and better tailor our Services to our users’ needs. For example, some of the information may be collected so that when you visit the Site or the Services again, it will recognize you and the information could then be used to serve advertisements and other information appropriate to your interests. Except as noted in this Privacy Policy, we do not link this automatically-collected data to Personal Data.
                        </li>
                        <li>
                            <b>Cookies.</b> Like many online services, we use cookies to collect information. “Cookies” are small pieces of information that a website sends to your computer’s hard drive while you are viewing the website. We may use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Site. This type of information is collected to make the Site more useful to you and to tailor the experience with us to meet your special interests and needs.
                        </li>
                        <li>
                            <b>Pixel Tags.</b> In addition, we use “Pixel Tags” (also referred to as clear Gifs, Web beacons, or Web bugs). Pixel Tags are tiny graphic images with a unique identifier, similar in function to Cookies that are used to track online movements of Web users. In contrast to Cookies, which are stored on a user’s computer hard drive, Pixel Tags are embedded invisibly in Web pages. Pixel Tags also allow us to send e-mail messages in a format users can read, and they tell us whether e-mails have been opened to ensure that we are sending only messages that are of interest to our users. We may use this information to reduce or eliminate messages sent to a user. We do not tie the information gathered by Pixel Tags to our users’ Personal Data.
                        </li>
                        <li>
                            <b>Third Party Analytics.</b> We may use Third Party Analytics to help analyze how users use the Site. Third Party Analytics use Cookies to collect information such as how often users visit the Site, what pages they visit, and what other sites they used prior to coming to the Site. We use the information we get from Third Party Analytics only to improve our Site and Services. Third Party Analytics collects only the IP address assigned to you on the date you visit the Site, rather than your name or other personally identifying information. We do not combine the information generated through the use of Third Party Analytics with your Personal Data. Although Third Party Analytics plants a persistent Cookie on your web browser to identify you as a unique user the next time you visit the Site, the Cookie cannot be used by anyone but the Third Party. The Third Party’s ability to use and share information collected by Third Party Analytics about your visits to the Site is restricted by the Third Party’s Terms of Use and the Third Party’s Privacy Policy.
                        </li>
                    </ul>
                </section>
                <section>
                    <h5>6. Use of Your Personal Data</h5>
                    <h6>(a) General Use.</h6>
                    <p>In general, Personal Data you submit to us is used either to respond to requests that you make, or to aid us in serving you better. We may use your Personal Data in the following ways:</p>
                    <ul>
                        <li>facilitate the creation of and secure your Account on our network;</li>
                        <li>identify you as a user in our system;</li>
                        <li>provide improved administration of our Site and Services;</li>
                        <li>provide the Services you request;</li>
                        <li>improve the quality of experience when you interact with our Site and Services;</li>
                        <li>send you our newsletter;</li>
                        <li>form, manage, and implement Team groups</li>
                        <li>send you a welcome e-mail to verify ownership of the e-mail address provided when your Account was created;</li>
                        <li>send you administrative e-mail notifications, such as security or support and maintenance advisories;</li>
                        <li>respond to your inquiries related to employment opportunities or other requests;</li>
                        <li>to comply with applicable laws and regulations and to operate our business; and</li>
                        <li>make telephone calls to you, from time to time, as a part of secondary fraud protection or to solicit your feedback.</li>
                    </ul>
                    <h6>(b) User Testimonials and Feedback.</h6>
                    <p>
                        On occasion we receive testimonials and comments from users who have had positive experiences with our Services. We occasionally publish such content. When we publish this content, we may identify our users by their first and last name and may also indicate their home city. We obtain the user’s consent prior to posting his or her name along with the testimonial. We may post user feedback on the Site from time to time. We will share your feedback with your first name and last initial only. If we choose to post your first and last name along with your feedback, we will obtain your consent prior to posting you name with your feedback. If you make any comments on a blog or forum associated with our Site, you should be aware that any Personal Data you submit there can be read, collected, or used by other users of these forums, and could be used to send you unsolicited messages. We are not responsible for the personally identifiable information you choose to submit in these blogs and forums.
                    </p>
                </section>
                <section>
                    <h5>7. Disclosure of Your Personal Data.</h5>
                    <p>We may disclose your Personal Data as described below and as described elsewhere in this Privacy Policy.</p>
                    <ul>
                        <li>(a) Users. If we share your Personal Data with other Users, it will solely be for the purpose of providing the Services. This includes providing your Personal Data to Users, such as team managers, assessors, proctors, instructors, and/or evaluators, to facilitate your use of the Service.</li>
                        <li>(b) Third Party Service Providers. We may share your Personal Data with third party service providers to: provide you with the Services that we offer you through our Site; to conduct quality assurance testing; to facilitate creation of accounts; to provide technical support; and/or to provide other services to the SiFive. These third party service providers are required not to use your Personal Data other than to provide the services requested by SiFive.</li>
                        <li>(c) Affiliates. We may share some or all of your Personal Data with our parent company, subsidiaries, joint ventures, or other companies under a common control (“Affiliates”), in which case we will require our Affiliates to honor this Privacy Policy.</li>
                        <li>
                            (d) Corporate Restructuring. We may share some or all of your Personal Data in connection with or during negotiation of any merger, financing, acquisition or dissolution transaction or proceeding involving sale, transfer, divestiture, or disclosure of all or a portion of our business or assets. In the event of an insolvency, bankruptcy, or receivership, Personal Data may also be transferred as a business asset. If another company acquires our company, business, or assets, that company will possess the Personal Data collected by us and will assume the rights and obligations regarding your Personal Data as described in this Privacy Policy.
                        </li>
                        <li>
                            (e) Public Profile. Certain portions of the information you provide to us may also be displayed in your Profile. As an essential element of the Services, most of the Personal Data you explicitly provide to us when you register or update your Profile is displayed on your Profile. In order for your Profile to be made public, you must go to your profile settings and then to profile visibility. By default, your Profile is not for public viewing. Your photos, posts, friends, and other content you post to the Site are also meant for public consumption. We may display this content on the Site and further distribute it to a wider audience through third party sites and services. Once displayed on publicly viewable web pages, that information can be collected and used by others. We cannot control who reads your postings or what other users may do with the information that you voluntarily post, so it is very important that you do not put Personal Data in your posts. Once you have posted information publicly, while you will still be able to edit and delete it on the Site, you will not be able to edit or delete such information cached, collected, and stored elsewhere by others (e.g., search engines).
                        </li>
                        <li>
                            (f) Social Networking Sites. Some of our Services may enable you to post content to SNSs (e.g., Facebook or Twitter). If you choose to do this, we will provide information to such SNSs in accordance with your elections. You acknowledge and agree that you are solely responsible for your use of those websites and that it is your responsibility to review the terms of use and privacy policy of the third party provider of such SNSs. We will not be responsible or liable for: (i) the availability or accuracy of such SNSs; (ii) the content, products or services on or availability of such SNSs; or (iii) your use of any such SNSs.
                        </li>
                        <li>
                            (g) Other Disclosures. Regardless of any choices you make regarding your Personal Data (as described below), SiFive may disclose Personal Data if it believes in good faith that such disclosure is necessary (a) in connection with any legal investigation; (b) to comply with relevant laws or to respond to subpoenas or warrants served on SiFive; (c) to protect or defend the rights or property of SiFive or users of the Site or Services; and/or (d) to investigate or assist in preventing any violation or potential violation of the law, this Privacy Policy, or our Terms of Use.
                        </li>
                    </ul>
                </section>
                <section>
                    <h5>8. Third Party Websites.</h5>
                    <p>
                        Our Site may contain links to third party websites. When you click on a link to any other website or location, you will leave our Site and go to another site, and another entity may collect Personal Data or Anonymous Data from you. We have no control over, do not review, and cannot be responsible for, these outside websites or their content. Please be aware that the terms of this Privacy Policy do not apply to these outside websites or content, or to any collection of your Personal Data after you click on links to such outside websites. We encourage you to read the privacy policies of every website you visit. The links to third party websites or locations are for your convenience and do not signify our endorsement of such third parties or their products, content or websites.
                    </p>
                </section>
                <section>
                    <h5>9. Legal Basis of Processing.</h5>
                    <p>To collect, use and otherwise process your Personal Data, SiFive may rely on any of the following legal bases:</p>
                    <ul>
                        <li>To communicate with you, respond to your requests, and making the Services available, we need to process information about you and therefore have a legitimate interest in processing the information.</li>
                        <li>Processing of information about you for legal or compliance/regulatory purposes is based on a legal obligation and/or on our legitimate interest in complying with applicable laws and regulations.</li>
                        <li>Your consent, where SiFive has obtained your consent to process your information for certain activities. Such consent may be withdrawn at any time by contacting privacy@sifive.com.</li>
                    </ul>
                </section>
                <section>
                    <h5>10. Your Choices Regarding Information.</h5>
                    <p>You have several choices regarding the use of information on our Service and your Personal Data:</p>
                    <ul>
                        <li>
                            (a) Email Communications. We will periodically send you free newsletters and e- mails that directly promote the use of our Site or Services. When you receive newsletters or promotional communications from us, you may indicate a preference to stop receiving further communications from us and you will have the opportunity to “opt-out” by following the unsubscribe instructions provided in the e-mail you receive or by contacting us directly (please see contact information below). Despite your indicated e-mail preferences, we may send you service related communications, including notices of any updates to our Terms of Use or Privacy Policy.
                        </li>
                        <li>
                            (b) Cookies. If you decide at any time that you no longer wish to accept Cookies from our Service for any of the purposes described above, then you can instruct your browser, by changing its settings, to stop accepting Cookies or to prompt you before accepting a Cookie from the websites you visit. Consult your browser’s technical information. If you do not accept Cookies, however, you may not be able to use all portions of the Service or all functionality of the Service. If you have any questions about how to disable or modify Cookies, please let us know at the contact information provided below.
                        </li>
                        <li>
                            (c) De-Linking SNS. If you decide at any time that you no longer wish to have your SNS account (e.g., Facebook or Twitter) linked to your Account, then you may de-link the SNS account in the “preferences” section in your account settings. You may also manage the sharing of certain Personal Data with us when you connect with us through an SNS, such as through Facebook Connect. Please refer to the privacy settings of the SNS to determine how you may adjust our permissions and manage the interactivity between the Services and your social media account or mobile device.
                        </li>
                        <li>
                            (d) Changing or Deleting Your Personal Data. You may change any of your Personal Data in your Account by editing your profile within your Account or, for Personal Data we process that is not in your account, by making the request to privacy@sifive.com. You may delete your Personal Data and Account by choosing the delete option in your profile within your Account. When we delete any information, it will be deleted from the active database, but may remain in our archives. We may also retain your information for fraud or similar purposes.
                        </li>
                        <li>
                            (e)Data Access, Use, and Processing. You may request access to Personal Data that we hold about you that is not accessible through your Account. You may also restrict the use of your Personal Data and object to our processing of it. Where consent has been obtained for processing your Personal Data, you may also withdraw any such consent for the use of your Personal Data. Any requests regarding access, use, and processing of your Personal Data that cannot be addressed by you in your account can be made to privacy@sifive.com
                        </li>
                        <li>
                            (f) Supervisory authority.  SiFive will attempt to resolve any issues with respect to the rights in our processing of your Personal Data. Should our attempt be unsatisfactory, you may contact a supervisory authority regarding your rights.
                        </li>
                    </ul>
                </section>
                <section>
                    <h5>11. Security of Your Personal Data.</h5>
                    <p>
                        SiFive is committed to protecting the security of your Personal Data. We use a variety of industry-standard security technologies and procedures to help protect your Personal Data from unauthorized access, use, or disclosure. We also require you to enter a password to access your Account information. Please do not disclose your Account password to unauthorized people. No method of transmission over the Internet, or method of electronic storage, is 100% secure, however. Therefore, while SiFive uses reasonable efforts to protect your Personal Data, SiFive cannot guarantee its absolute security.
                    </p>
                </section>
                <section>
                    <h5>12. Changes to This Privacy Policy.</h5>
                    <p>
                        This Privacy Policy is subject to occasional revision, and if we make any material changes in the way we use your Personal Data, we will notify you by sending you an e-mail to the last e- mail address you provided to us and/or by prominently posting notice of the changes on our Site. Any changes to this Privacy Policy will be effective upon the earlier of thirty (30) calendar days following our dispatch of an e-mail notice to you or thirty (30) calendar days following our posting of notice of the changes on our Site. These changes will be effective immediately for new users of our Service. Please note that at all times you are responsible for updating your Personal Data to provide us with your most current e-mail address. In the event that the last e-mail address that you have provided us is not valid, or for any reason is not capable of delivering to you the notice described above, our dispatch of the e-mail containing such notice will nonetheless constitute effective notice of the changes described in the notice. If you do not wish to permit changes in our use of your Personal Data, you must notify us prior to the effective date of the changes that you wish to deactivate your Account with us. Continued use of our Site or Service, following notice of such changes shall indicate your acknowledgement of such changes and agreement to be bound by the terms and conditions of such changes.
                    </p>
                </section>
            </div>`;

    }

}

export { PrivacyView };
