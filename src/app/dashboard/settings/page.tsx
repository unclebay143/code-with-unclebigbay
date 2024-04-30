import UserPersonalInfoForm from '@/components/molecules/dashboard/settings/personal-form';
import UserProfessionalsForm from '@/components/molecules/dashboard/settings/professional-form';
import UserSocialsForm from '@/components/molecules/dashboard/settings/socials-form';
import AnonymityForm from '@/components/molecules/dashboard/settings/anonimity-form';
import { getCountries, getCurrentStudent } from '@/utils/server.service';

const Page = async () => {
  const studentRes = await getCurrentStudent();
  const countriesRes = await getCountries();
  const sortedCountries = countriesRes ? countriesRes?.sortedCountries : [];
  const student = studentRes!.student;

  return (
    <div className="lg:(w-[80%] px-3)">
      <div className="flex flex-col gap-4">
        <UserPersonalInfoForm
          countries={sortedCountries}
          currentStudent={student}
        />
        <UserProfessionalsForm />
        <UserSocialsForm />
        <AnonymityForm />
      </div>
    </div>
  );
};

export default Page;
