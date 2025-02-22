import { Linkedin, Mail, Twitter } from "react-feather";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10 px-5">
      <div className="px-4 flex w-full flex-wrap justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Let’s Stay Connected ✨</h2>
          <p className="text-sm mt-2 max-w-sm">
            Have a question, an idea, or just want to say hi? I’d love to hear
            from you! Let’s create something great together.
          </p>
          <div className="text-lg mt-3 opacity-80">
            © {new Date().getFullYear()} BearBook. Made with ❤️
          </div>
        </div>

        <div>
          <h2 className="text-sm mt-2 font- max-w-72 flex-wrap text-right">
          Let’s Connect & Create! 
          </h2>
          <div className="float-right flex space-x-4 mt-3">
            <a
              href="#"
              className="bg-white p-2 rounded-full text-blue-500 hover:text-purple-600 transition"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="bg-white p-2 rounded-full text-blue-500 hover:text-purple-600 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="bg-white p-2 rounded-full text-blue-500 hover:text-purple-600 transition"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
