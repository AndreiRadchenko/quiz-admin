import { BucketButtons } from './_components/BucketButtons';
import PageHeader from './_components/PageHeader';
import { ImportFileForm } from '../_components/ImportFileForm';

import { getDictionary } from '../../../../../dictionaries/dictionaries';
import PageContextProvider from './_context/pageContext';
import { importImages } from '@/actions/buckets';

import { config } from '@/config';
import { type BucketsType } from '../../../../../dictionaries/dictionaries';
import { type Locale } from '../../../../../i18n-config';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
  params: { lang: Locale };
};

export default async function BucketsLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const {
    quiz: { buckets },
  } = await getDictionary(lang);

  const { importImagesForm: importForm, table } = buckets as BucketsType;

  return (
    <PageContextProvider bucketsLocale={buckets}>
      <PageHeader titles={buckets.title} />
      <BucketButtons buttons={buckets.buttons}>
        <ImportFileForm
          field={'importImages'}
          label={importForm!.label}
          buttonText={importForm!.buttonText}
          tooltip={importForm!.tooltip}
        />
      </BucketButtons>
      <div id="bucket-content" className="w-full h-auto min-h-24">
        {children}
      </div>
    </PageContextProvider>
  );
}
