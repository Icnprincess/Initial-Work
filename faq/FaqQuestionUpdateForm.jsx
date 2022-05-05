import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import faqFormSchema from './faqFormSchema';
import * as faqService from '../../services/faqService';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import logger from 'sabio-debug';
const _logger = logger.extend('FaqUpdateForm');

function FaqQuestionUpdateForm(props) {
    _logger(props);

    const { state } = useLocation();
    _logger(state);

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

    //Edit questions
    const submitForm = (question) => {
        faqService.updateFaq(question).then(onUpdateFaqSuccess).catch(onUpdateFaqError);
    };

    const onUpdateFaqSuccess = (state) => {
        _logger(`FAQ Id: ${state.id} updated`);
        toastr.success(`Question was successfully updated`);
    };

    const onUpdateFaqError = (err) => {
        _logger(err);
        toastr.error('Question was not updated.', 'Please try again.');
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={state}
                validationSchema={faqFormSchema}
                onSubmit={submitForm}>
                <div className="card">
                    <div className="row mx-auto bg-light border" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <h1 className="text-center">Update Question {state.id}</h1>
                        <Form>
                            <div className="text-center">
                                <div className="form-group">
                                    <label htmlFor="question">Question</label>
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
                                        Update Question
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </Formik>
        </>
    );
}

export default FaqQuestionUpdateForm;
