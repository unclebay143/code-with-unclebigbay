'use client';

import {
  ArrowDownloadSave,
  ArrowResetRefreshRight,
  Banner,
  Button,
  CloudCheck,
  FormFieldLabel,
  InputField,
} from '@hashnode/matrix-ui';
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import { CSVLink } from 'react-csv';
import { toast } from 'sonner';

function getUsernameURL(url: string) {
  if (!url || typeof url !== 'string') {
    return null;
  }
  // Remove trailing slashes and dots (optional for specific needs)
  url = url.replace(/\/+$|\.$/, '');

  const username = url.split('/').pop();

  if (!username) {
    return null;
  }

  const cleanedUsername = username?.replace(/^@/, '');

  return cleanedUsername;
}

const Page = () => {
  const [courseSlug, setCourseSlug] = useState('');
  const [userNames, setUserNames] = useState<any[]>();
  const [extractedResult, setExtractedResult] = useState<{}[]>();
  const [fileName, setFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const showExtractedResults = extractedResult && extractedResult.length > 0;
  const showDefaultState = !showExtractedResults;

  const restToDefault = () => setExtractedResult([]);

  const handleExtract = async () => {
    setIsLoading(true);
    if (!courseSlug) {
      setIsLoading(false);
      return toast.error('course slug is required');
    }
    if (!userNames || userNames?.length === 0) {
      setIsLoading(false);
      return toast.error('csv file cannot be empty');
    }
    const res = await fetch('/api/assignments/external/result-extractor', {
      method: 'POST',
      body: JSON.stringify({ userNames, courseSlug }),
    });

    const result = await res.json();
    if (!res.ok) {
      setIsLoading(false);
      return toast.error(result.message);
    }

    console.dir(result.extractedStudentResult.filter((r) => r.invalidUsername));
    console.dir(
      result.extractedStudentResult.filter((r) => !r.invalidUsername),
    );

    setExtractedResult(result.extractedStudentResult);
    toast.success('Assignment results extracted successfully.');
    setIsLoading(false);
  };

  return (
    <div className="max-w-lg px-5 mx-auto flex flex-col justify-center items-center min-h-screen">
      {showDefaultState && (
        <section className="w-full flex flex-col gap-3">
          <Banner
            title="CSV Guideline"
            description="Ensure the heading for the usernames is 'cwubbUsername'"
            color="neutral"
          />
          <FormFieldLabel id="file">Upload .csv File</FormFieldLabel>
          <InputField
            onChange={(e) => setCourseSlug(e.target.value)}
            value={courseSlug}
            id="file"
            placeholder="Enter course slug i.e introduction-to-css"
            size="sm"
          />

          <CSVReader
            parserOptions={{ header: true }}
            onFileLoaded={(data, fileInfo) => {
              const ghUsernames = data.map((datum) =>
                getUsernameURL(datum['cwubbUsername']),
              );
              setUserNames(ghUsernames);
            }}
          />
          <Button
            startIcon={CloudCheck}
            disabled={isLoading}
            size="md"
            appearance="primary-slate"
            width="full"
            onClick={handleExtract}
          >
            Extract
          </Button>
        </section>
      )}

      {showExtractedResults && (
        <section className="w-full flex flex-col gap-3">
          <FormFieldLabel id="file" showOptionalText>
            Upload .csv File
          </FormFieldLabel>
          <InputField
            onChange={(e) => setFileName(e.target.value)}
            value={fileName}
            id="file"
            placeholder="Enter file name i.e assignment 1"
            size="sm"
          />
          <Button
            disabled={isLoading}
            size="md"
            appearance="primary-slate"
            width="full"
            startIcon={ArrowDownloadSave}
            asChild
          >
            <CSVLink
              data={extractedResult}
              target="_blank"
              {...(fileName && { filename: `${fileName}.csv` })}
            >
              Download
            </CSVLink>
          </Button>

          <Button
            onClick={restToDefault}
            appearance="link-slate"
            width="full"
            startIcon={ArrowResetRefreshRight}
            size="xs"
          >
            Reset
          </Button>
        </section>
      )}
    </div>
  );
};

export default Page;
