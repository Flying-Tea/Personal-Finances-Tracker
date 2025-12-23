import React from "react";
import { ListChecks, ChartBar, Workflow, AppWindow } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    title: "User Interface",
    description: "Plan and structure your finances how you want. Quickly organizing goals.",
    icon: <ListChecks />,
  },
  {
    title: "App Productivity",
    description: "Bring all your financial data together on one platform. With unparalleled organization.",
    icon: <AppWindow />,
  },
  {
    title: "Data Reporting",
    description: "Get real time insight into your progress and track all your expenditures.",
    icon: <ChartBar />,
  },
  {
    title: "Payment Management",
    description: "Automate your monthly payments, income entries, and rid wasteful spending.",
    icon: <Workflow />,
  },
];

const FeatureCard: React.FC<Feature> = ({ title, description, icon }) => (
  <div className="flex flex-col items-center p-6 text-center">
    <div className="w-20 h-20 text-3xl flex items-center justify-center rounded-md bg-secondary/5 text-secondary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="opacity-55 text-sm max-sm:px-10">{description}</p>
  </div>
);

interface HeadingField {
  text?: string;
  className?: string;
}

interface FeatureSection1Props {
  featureBadge?: HeadingField;
  mainHeading?: HeadingField;
  subHeading?: HeadingField;
  featuresArray?: Feature[];
}

const FeatureSection1: React.FC<FeatureSection1Props> = ({
  featureBadge,
  mainHeading,
  subHeading,
  featuresArray = features,
}) => {
  const {
    text: featureBadgeText = "Explore Our Features",
    className: featureBadgeClassName = "",
  } = featureBadge ?? {};

  const {
    text: mainHeadingText = "Unlock Financial Clarity with Our Comprehensive Features",
    className: mainHeadingClassName = "",
  } = mainHeading ?? {};

  const {
    text: subHeadingText =
      "Discover how our features can help you achieve your financial goals with ease and efficiency.",
    className: subHeadingClassName = "",
  } = subHeading ?? {};

  return (
    <div className="py-12 text-white">
      <div className="max-w-7xl flex justify-center items-center mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Badge variant="secondary" className={featureBadgeClassName}>
          {featureBadgeText}
        </Badge>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className={`text-3xl max-sm:px-10 font-extrabold w-full sm:text-4xl ${mainHeadingClassName}`}
        >
          {mainHeadingText}
        </h2>

        <p className={`mt-3 text-lg max-sm:px-10 max-sm:text-sm opacity-50 ${subHeadingClassName}`}>
          {subHeadingText}
        </p>

        {/* Simple Tailwind auto-fit grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          {featuresArray.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection1;
