'use client';

import {
  ArrowDownloadSave,
  ArrowRefresh,
  ArrowResetRefreshRight,
  Badge,
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
import { removeArrayDuplicates } from '@/utils';

function cleanUsernames(url: string) {
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
    try {
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
        body: JSON.stringify({
          userNames: userNames.map((username) =>
            username?.toLowerCase().trim(),
          ),
          courseSlug,
        }),
      });

      const result = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        return toast.error(result.message);
      }

      setExtractedResult(result.extractedStudentResult);
      toast.success('Assignment results extracted successfully.');
      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong: ' + error);
      setIsLoading(false);
    }
  };

  const invalidUsernameCount = extractedResult?.filter(
    (result: any) => result.invalidUsername,
  ).length;

  const usernameCount = userNames?.length;

  return (
    <div className="p-5 w-full flex flex-col justify-center items-center min-h-screen">
      {showDefaultState && (
        <section className="max-w-lg  mx-auto flex flex-col gap-3">
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
            onFileLoaded={(data) => {
              const usernames = data.map((datum) =>
                cleanUsernames(datum['cwubbUsername']),
              );
              const isInValidHeading = usernames.includes(null);
              if (isInValidHeading) {
                return toast.error('Username headings must be cwubbUsername');
              }

              const uniqueData = removeArrayDuplicates(usernames);
              setUserNames(uniqueData);
            }}
          />
          <Button
            startIcon={isLoading ? ArrowRefresh : CloudCheck}
            disabled={isLoading}
            size="md"
            appearance="primary-slate"
            width="full"
            onClick={handleExtract}
            startIconClassName={`${isLoading && 'animate-spin'}`}
          >
            {isLoading ? 'Please wait' : 'Extract'}
          </Button>
        </section>
      )}

      {showExtractedResults && (
        <section className="max-w-5xl w-full mx-auto flex flex-col gap-10 py-10">
          <section className="w-full flex items-start justify-start">
            <Button
              onClick={restToDefault}
              appearance="link-slate"
              startIcon={ArrowResetRefreshRight}
              size="xs"
            >
              Reset
            </Button>
          </section>
          <section className="mt-10 w-full max-w-lg mx-auto flex flex-col gap-3">
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
          </section>
          <section className="flex items-center gap-2 text-slate-700 text-sm">
            <div>Total: {usernameCount}</div>
            <span>&middot;</span>
            <div>Total Invalids: {invalidUsernameCount}</div>
          </section>
          <div className="w-full border overflow-x-scroll dark:border-slate-800/80 rounded-xl">
            <table className="px-10 w-full">
              <thead>
                <tr>
                  <th className="w-[25%] text-left pl-6 py-4">username</th>
                  <th className="w-[25%] text-left pl-6 py-4">Action</th>
                  <th className="w-[25%] text-left pl-6 py-4">score</th>
                  <th className="w-[25%] text-left pl-6 py-4">total</th>
                </tr>
              </thead>
              <tbody>
                {extractedResult &&
                  extractedResult.map((res: any) => (
                    <tr
                      key={res.username}
                      className={`not-last-of-type:border-b dark:border-slate-800/80 ${res.invalidUsername ? 'bg-red-50 hover:bg-slate-100' : 'bg-slate-50 hover:bg-slate-100'}`}
                    >
                      <td className="w-[25%] py-4 pl-6">
                        <div className="flex gap-1">
                          {res.username}
                          {res.invalidUsername && (
                            <Badge theme="red">invalid</Badge>
                          )}
                        </div>
                      </td>
                      <td className="w-[25%] py-4 pl-6">
                        <div className="flex gap-2 items-center">
                          <a
                            href={`http://github.com/@${res.username}`}
                            target="_blank"
                            rel="noopener"
                            className="underline"
                          >
                            Github
                          </a>
                          <a
                            href={`https://www.codewithunclebigbay.com/@${res.username}`}
                            target="_blank"
                            rel="noopener"
                            className="underline"
                          >
                            Cwubb
                          </a>
                        </div>
                      </td>
                      <td className="w-[25%] py-4 pl-6">{res.score}</td>
                      <td className="w-[25%] py-4 pl-6">{res.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
