import { BrandXTwitter, BrandYoutube } from '@hashnode/matrix-ui';
import { ReactElement } from 'react';

export const mapTestimonialSourceToIcon: { [key: string]: ReactElement } = {
  LinkedIn: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="inline-block ml-1 group-hover:text-green-600 bi bi-linkedin"
      viewBox="0 0 16 16"
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
    </svg>
  ),

  Twitter: <BrandXTwitter size="md" />,

  Whatsapp: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="currentColor"
      className="inline-block ml-1 group-hover:text-green-600 bi bi-whatsapp"
      viewBox="0 0 16 16"
    >
      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  ),

  YouTube: <BrandYoutube size="md" />,
};

export const mapTestimonialSourceToColor: { [key: string]: string } = {
  LinkedIn: '#0077B5',
  Twitter: '#e2e8f0',
  Whatsapp: '#075E54',
  YouTube: '#ffffff',
};

export const testimonials = [
  {
    author: {
      name: 'Damilola Oyedunmade',
      img: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1718174839431/6344b2ba-7e44-4409-a396-38cac51c29a4.jpeg?auto=compress',
      title: 'Student',
    },
    quote:
      'This is a great Christmas present Unclebigbay. Excited about the journey ahead.',
    srcUrl:
      'https://www.youtube.com/watch?v=JH77WsDH8yY&lc=Ugx9xFO1m8N2GKXbV1J4AaABAg',
    src: 'YouTube',
  },
  {
    author: {
      name: 'Victor Josiah',
      img: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1718175294200/4b661b33-abe8-427d-994f-2bd790e0933e.jpeg?auto=compress',
      title: 'Student',
    },
    quote:
      'My boss, it has been an amazing journey with you and your community, I will be recommending this channel to all my friends that have interest in coding, because this is where I started.',
    srcUrl:
      'https://www.youtube.com/watch?v=JH77WsDH8yY&lc=UgzzDDqv6SRSoBsmPht4AaABAg',
    src: 'YouTube',
  },
  {
    author: {
      name: 'Mba Nnenna',
      img: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1718175545285/7f458568-a356-4959-847b-49214c19ad36.jpeg?auto=compress',
      title: 'Student',
    },
    quote:
      'Nice content! You have me onboard! I have subscribed and turn on my notifications cos I can’t miss out on this awesome opportunity. Keep up unclebigbay',
    srcUrl:
      'https://www.youtube.com/watch?v=rYvrUzzxcaE&lc=Ugxiik6wKEmcjBtbI1R4AaABAg',
    src: 'YouTube',
  },
  {
    author: {
      name: 'YouTube User',
      img: '',
      title: 'Student',
    },
    quote:
      "Amazing work Unclebigbay. I came here from x and I've learnt so much already. I've subscribed and turned on notification. Keep up the good work.",
    srcUrl:
      'https://www.youtube.com/watch?v=fS1lArPOHOU&lc=UgwPtBmnkCPbPQdn1_Z4AaABAg',
    src: 'YouTube',
  },
  // {
  //   author: {
  //     name: 'YouTube User',
  //     img: '',
  //     title: 'Student',
  //   },
  //   quote:
  //     "Thank you Sam (unclebigbay) you make CSS easy. Ur explanations on each section is awesome. Thank you very much 🔥💯",
  //   srcUrl:
  //     'https://www.youtube.com/watch?v=fS1lArPOHOU&lc=UgwPtBmnkCPbPQdn1_Z4AaABAg',
  //   src: 'YouTube',
  // },
];
