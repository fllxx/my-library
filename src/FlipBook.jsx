// src/FlipBook.jsx
import React, { useEffect, useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/webpack";

const FlipBook = ({ pdfUrl }) => {
  const [pages, setPages] = useState([]);
  const flipBook = useRef(null);

  useEffect(() => {
    const loadPDF = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;

      const tempPages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const viewport = page.getViewport({ scale: 2 });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({ canvasContext: context, viewport }).promise;
 // 👉 FIRST PAGE (cover) — do NOT split
  if (i === 1) {
    tempPages.push(canvas.toDataURL());
    continue;
  }
  // 👉 Split into left & right
  const halfWidth = canvas.width / 2;

  // LEFT PAGE
  const leftCanvas = document.createElement("canvas");
  const leftCtx = leftCanvas.getContext("2d");
  leftCanvas.width = halfWidth;
  leftCanvas.height = canvas.height;

  leftCtx.drawImage(
    canvas,
    0, 0, halfWidth, canvas.height,
    0, 0, halfWidth, canvas.height
  );

  // RIGHT PAGE
  const rightCanvas = document.createElement("canvas");
  const rightCtx = rightCanvas.getContext("2d");
  rightCanvas.width = halfWidth;
  rightCanvas.height = canvas.height;

  rightCtx.drawImage(
    canvas,
    halfWidth, 0, halfWidth, canvas.height,
    0, 0, halfWidth, canvas.height
  );

  // 👉 Add as separate pages
  tempPages.push(leftCanvas.toDataURL());
  tempPages.push(rightCanvas.toDataURL());
}
      setPages(tempPages);
    };

    loadPDF();
  }, [pdfUrl]);

  return (
    <div style={{ width: "90%", margin: "0 auto" }}>
      {pages.length > 0 && (
        <HTMLFlipBook
          width={600}
          height={800}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          maxHeight={1536}
          minHeight={400}
          showCover={true}
          mobileScrollSupport={true}
          ref={flipBook}
        >
          {pages.map((pageSrc, idx) => (
            <div key={idx} className="page">
              <img
                src={pageSrc}
                alt={`Page ${idx + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default FlipBook;



/*
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        tempPages.push(canvas.toDataURL());
      }
        */