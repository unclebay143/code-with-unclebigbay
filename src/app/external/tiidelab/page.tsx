'use client';

import {
  ArrowDownloadSave,
  ArrowResetRefreshRight,
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
    return null; // Handle invalid input
  }

  const parts = url.split('/');
  if (parts.length < 1) {
    return null; // Handle empty email or missing "@" symbol
  }

  return parts[0]; // Return the entire username before "@"
}

const Page = () => {
  const [courseSlug, setCourseSlug] = useState('');
  const [gitHubUsernames, setGitHubUsernames] = useState<any[]>();
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
    if (!gitHubUsernames || gitHubUsernames?.length === 0) {
      setIsLoading(false);
      return toast.error('csv file cannot be empty');
    }
    const res = await fetch('/api/assignments/external/result', {
      method: 'post',
      body: JSON.stringify({ gitHubUsernames, courseSlug }),
    });

    const result = await res.json();
    if (!res.ok) {
      setIsLoading(false);
      return toast.error(result.message);
    }

    setExtractedResult(result.extractedStudentResult);
    toast.success('Assignment results extracted successfully.');
    setIsLoading(false);
  };

  return (
    <div className="max-w-lg px-5 mx-auto flex flex-col justify-center items-center min-h-screen">
      {showDefaultState && (
        <section className="w-full flex flex-col gap-3">
          <FormFieldLabel id="file">Upload .csv File</FormFieldLabel>
          <InputField
            onChange={(e) => setCourseSlug(e.target.value)}
            value={courseSlug}
            id="file"
            placeholder="Enter course slug i.e introduction to css"
            size="sm"
          />

          <CSVReader
            parserOptions={{ header: true }}
            onFileLoaded={(data, fileInfo) => {
              const ghUsernames = data.map((datum) =>
                getUsernameURL(datum['Your GitHub Username']),
              );
              setGitHubUsernames(ghUsernames);
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
          {fileName}
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
