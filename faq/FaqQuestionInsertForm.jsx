import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import faqFormSchema from './faqFormSchema';
import * as faqService from '../../services/faqService';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import logger from 'sabio-debug';
const _logger = logger.extend('FaqAddForm');

function FaqQuestionInsertForm() {
    const [initalFormValues] = useState({
        question: '',
        answer: '',
        categoryId: '',
        sortOrder: '',
    });

    const [category] = useState([
        { id: 1, name: 'General' },
        { id: 2, name: 'Newsletter' },
        { id: 3, name: 'Campaigns' },
        { id: 4, name: 'Analytics' },
        { id: 5, name: 'Management' },
    ]);

    const mapCategory = (category) => (
        <option value={category.id} key={`category_${category.id}`}>
            {category.name}
        </option>
    );

    //Add questions
    const submitForm = (question) => {
        faqService.addFaq(question).then(onAddFaqSuccess).catch(onAddFaqError);
    };

    const onAddFaqSuccess = (data) => {
        _logger(`New FAQ Id: ${data.item}`);
        toastr.success(`Question ${data.item} successfully added`);
    };

    const onAddFaqError = (err) => {
        _logger(err);
        toastr.error('Question was not added.', 'Please try again.');
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initalFormValues}
            validationSchema={faqFormSchema}
            onSubmit={submitForm}>
            <div className="card">
                <div className="row mx-auto bg-light border" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <h1 className="text-center ">Add Question</h1>
                    <Form>
                        <div className="text-center ">
                            <div className="form-group">
                                <label htmlFor="question">Question </label>
                                <Field component="textarea" name="question" className="form-control" />
                                <ErrorMessage name="question" component="div" className="mx-3" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="answer">Answer</label>
                                <Field component="textarea" name="answer" className="form-control" />
                                <ErrorMessage name="answer" component="div" className="mx-3" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Please select a category for your question</label>
                                <Field component="select" name="categoryId" className="form-control">
                                    <option value="">Select</option>
                                    {category.map(mapCategory)}
                                </Field>
                            </div>

                            <div className="form-group">
                                <label htmlFor="sortOrder">Sort Order</label>
                                <Field type="number" name="sortOrder" className="form-control" />
                                <ErrorMessage name="sortOrder" component="div" className="mx-3" />
                            </div>

                            <div className="mx-2">
                                <button type="submit" className="btn btn-primary " onSubmit={submitForm}>
                                    Add Question
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Formik>
    );
}

export default FaqQuestionInsertForm;
