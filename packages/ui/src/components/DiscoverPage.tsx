import React from "react";

import { ArrowUpFromDot } from "lucide-react";

export default (): React.ReactNode => {

  const card = ({ title, description, link, icon }: {
    title: string;
    description: string;
    link: string;
    icon: React.ReactNode;
  }) => (
    <a
      href={link}
      className="block p-6 max-w-sm bg-card rounded-lg hover:bg-secondary"
      target="_blank"
      rel="noopener noreferrer"
      key={title}
    >
      {icon}
      <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
      <p className="font-normal">{description}</p>
    </a>
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 ml-8">Discover</h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {card({
          title: "Entry Points",
          description: "Read Entry Points",
          link: "/entry-points",
          icon: <ArrowUpFromDot className="mb-4 h-16 w-16 text-primary" />,
        })}

      </div>
    </div>
  )
}
