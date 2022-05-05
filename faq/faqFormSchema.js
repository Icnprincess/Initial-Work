import * as Yup from 'yup';

const faqFormSchema = Yup.object().shape({
    question: Yup.string()
        .min(2, 'A Question Must Be More Than 10 Characters')
        .max(255, 'A Question Must Be Less Than 255 Characters')
        .required('This is a Required Field'),

    answer: Yup.string()
        .min(2, 'An Answer Must Be More Than 2 Characters')
        .max(255, 'An Answer Must Be Less Than 255 Characters')
        .required('This is a Required Field'),

    sortOrder: Yup.number().required('This is a Required Field'),
});

export default faqFormSchema;
