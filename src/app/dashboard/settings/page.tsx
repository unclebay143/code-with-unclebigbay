import UserPersonalInfoForm from '@/components/molecules/dashboard/settings/personal-form';
import UserProfessionalsForm from '@/components/molecules/dashboard/settings/professional-form';
import UserSocialsForm from '@/components/molecules/dashboard/settings/socials-form';
import AnonymityForm from '@/components/molecules/dashboard/settings/anonimity-form';

const Page = () => {
  return (
    <div className="lg:(w-[80%] px-3)">
      <div className="flex flex-col gap-4">
        <UserPersonalInfoForm />
        <UserProfessionalsForm />
        <UserSocialsForm />
        <AnonymityForm />
      </div>
    </div>
  );
};

export default Page;
