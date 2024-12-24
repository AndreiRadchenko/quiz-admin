import { type Locale } from '../../../../../i18n-config';
import { getDictionary } from '../../../../../dictionaries/dictionaries';
import { BucketButtons } from './_components/BucketButtons';
import PageHeader from './_components/PageHeader';
import { ImportFileForm } from '../_components/ImportFileForm';
import { getActions } from '../actions';
import PageContextProvider from './_context/pageContext';

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

  const { importImagesForm: importForm, table } = buckets;
  const importFileActions = await getActions();

  return (
    <PageContextProvider bucketsLocale={buckets}>
      <PageHeader titles={buckets.title} />
      <BucketButtons buttons={buckets.buttons}>
        <ImportFileForm
          action={importFileActions['importImages']}
          field={'importImages'}
          label={importForm.label}
          buttonText={importForm.buttonText}
        />
      </BucketButtons>
      <div id="bucket-content" className="w-full h-auto min-h-24">
        {children}
      </div>
    </PageContextProvider>
  );
}
