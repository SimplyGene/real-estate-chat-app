import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { getLocationString, getTypeString } from "../utils";

// Ensure fonts are loaded
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface Property {
  name: string;
  price: string;
  description: string;
}

interface Options {
  [key: number]: Property;
}

const PDFGenerator: React.FC<{ options: Options }> = ({ options }) => {
  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: "Available properties from chatter estate", style: "header" },
        { text: "\n" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        property: {
          margin: [0, 0, 0, 10],
        },
      },
    };

    for (const key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        // @ts-ignore
        const property = JSON.parse(options[key]);
        docDefinition.content.push(
          {
            text: `Property ${key}:`,
            style: "property",
          },
          {
            // @ts-ignore
            ul: [
              `Name: ${property.name}`,
              `Price: ${property.price}`,
              `Description: ${property.description}`,
              `Location: ${getLocationString(property.location)}`,
              `House Type: ${getTypeString(property.houseType)}`,
              `Bedrooms: ${property.bedrooms}`,

              `Agent: ${property.agent}`,
            ],
          },
          { text: "\n" }
        );
      }
    }

    pdfMake.createPdf(docDefinition).download("options_data.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Download properties as pdf</button>
    </div>
  );
};

export default PDFGenerator;
