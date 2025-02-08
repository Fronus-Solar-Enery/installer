import { useTheme } from "@/ThemeProvider";
import ProgramLogo from "@/components/ProgramLogo";
import { InstallerForm } from "@/components/forms/InstallerForm";
import CheckStatus from "@/components/forms/StatusCheck";
import IconClose from "@/components/icons/Close";
import { Button } from "@/components/ui/Button";
import PictureCard from "@/components/ui/Cards/PictureCard";
import { Tabs } from "@/components/ui/Tabs";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import Typewriter from "@/components/ui/Typewriter";
import { AppDrawer } from "@/components/ui/drawer";
import { cn } from "@/utils";
import React from "react";

const Home = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const texts = ["Stronger", "Brighter", "Bolder", "Better"];
  // const tabItems = [
  //   {
  //     id: "register",
  //     label: "Register",
  //     content: <InstallerForm />,
  //   },
  //   {
  //     id: "status",
  //     label: "Check Status",
  //     content: <CheckStatus />,
  //   },
  // ];

  const { isDark, toggleTheme } = useTheme();
  return (
    <div className="py-4 gap-4 min-h-screen max-w-screen-xl overflow-x-hidden flex flex-col items-center relative lg:py-16 lg:px-12">
      <div className="top-6">
        <ThemeSwitch isDark={isDark} onThemeChange={toggleTheme} />
      </div>
      <div className="px-4 mx-auto text-center">
        <div className="flex justify-center mb-6 pointer-events-none select-none">
          <ProgramLogo />
        </div>
        <div
          className={cn(
            "inline-flex justify-between items-center py-1 px-1 pr-6 mb-1 text-sm rounded-full border transition-colors duration-300 group cursor-pointer select-none",
            "border-secondary-500/60 text-secondary-800 hover:bg-secondary-500/50",
            "dark:border-secondary-800 dark:text-secondary-400 dark:hover:bg-secondary-900"
          )}
          role="alert"
        >
          <span className="text-xs bg-primary-900 text-white dark:bg-primary-900 rounded-full dark:text-secondary-400 px-4 py-1.5 mr-3 transition-colors duration-300 font-semibold">
            Join Us
          </span>
          <span className="text-sm font-medium">
            Let's start shining Together!
          </span>
        </div>
        <div className="mb-4">
          <h1 className="text-4xl font-bold leading-tight text-secondary-800  md:text-5xl lg:text-6xl dark:text-secondary-400 font-clash text-balance">
            Shaping a Better{" "}
            <span className="text-primary-900 dark:text-primary-800">
              Future
            </span>
            , Making{" "}
            <span className="text-primary-900 dark:text-primary-800">
              installers
            </span>{" "}
            like you 
            <span className="text-primary-900 dark:text-primary-800">
              Stronger!
            </span>
          </h1>

          {/* <Typewriter
            text={texts}
            speed={150}
            className="text-primary-900 dark:text-primary-800 w-full text-4xl md:text-5xl lg:text-6xl font-clash font-bold"
            waitTime={1000}
            deleteSpeed={40}
            cursorChar={"|"}
          /> */}
        </div>
        <p className="mb-8 text-sm font-normal text-gray-500 lg:text-xl px-6 sm:px-16 xl:px-48 dark:text-gray-400">
          We believe in shaping a better future by empowering installers like
          you. Every installation helps you grow, succeed, and shine brighter!
        </p>
        <div className="flex flex-col items-center mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <a href="/register" className="px-6 py-4 rounded-xl text-white bg-primary-900 hover:bg-primary-800">
            Register Now! / <span className="urdu-text"> رجسٹر کریں</span>
          {/* <Button size="lg" variant="primary" className="w-max">
              Register Now! / رجسٹر کریں
          </Button> */}
          </a>
          {/* <AppDrawer
            trigger={
              <></>
            }
            contentClassName="bg-zinc-100"
            containerClassName="flex flex-col justify-center items-center sm:w-xl"
            title=" "
            titleClassName="text-xl text-center"
            description="Form for registering new installers with their personal and payment information"
            onOpenChange={setIsOpen}
            open={isOpen}
          >
            <Button
              size="icon"
              variant="danger"
              className="!absolute !p-2 rounded-full top-2 right-2 lg:top-6 lg:right-6"
              onClick={() => setIsOpen(false)}
            >
              <IconClose duotone={false} />
            </Button>
            <Tabs items={tabItems} defaultTab="register" className="w-full" />
          </AppDrawer> */}
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-xl lg:px-36">
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8 text-gray-500 sm:justify-between select-none pointer-events-none">
            <PictureCard
              title="Technical Support"
              subtitle="ٹیکنیکل سپورٹ"
              badge={{ text: "24/7", variant: "secondary" }}
              image="img/tech-support.avif"
            />
            <PictureCard
              title="Instant Repair"
              subtitle="فوری رپئیر"
              badge={{ text: "⚡︎", variant: "primary" }}
              image="img/instant-repair.avif"
            />
            <PictureCard
              title="Service Center Network"
              subtitle="سروس سنٹر نیٹ ورک"
              badge={{ text: "Largest", variant: "secondary" }}
              image="img/sc-network.avif"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
