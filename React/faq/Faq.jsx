import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as faqService from '../../services/faqService';
import Location from './FaqBreadCrumb';
import FaqCard from './FaqCard';
import PropTypes from 'prop-types';
import './faq.css';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import logger from 'sabio-debug';
const _logger = logger.extend('Faq');

function FAQ(props) {
    _logger(props.currentUser.isLoggedIn);
    _logger(props.currentUser.roles);

    const [faqList, setFaqList] = useState({
        faqs: [],
        arrayOfFaq: [],
    });

    FAQ.propTypes = {
        currentUser: PropTypes.shape({
            isLoggedIn: PropTypes.bool.isRequired,
            roles: PropTypes.arrayOf(PropTypes.string),
        }),
    };

    //get questions
    useEffect(() => {
        faqService.getFaq(0, 100).then(onGetFaqSuccess).catch(onGetFaqError);
    }, []);

    const onGetFaqSuccess = (data) => {
        _logger('Success', data);
        const importFaqList = data.item.pagedItems;

        setFaqList((prevState) => {
            const faqNewList = { ...prevState };
            faqNewList.faqs = importFaqList;
            faqNewList.arrayOfFaq = importFaqList.map(mapFaq);
            return faqNewList;
        });
    };

    const onGetFaqError = (err) => {
        _logger('Error', err);
    };

    const onClearAllClicked = (e) => {
        e.preventDefault();
        setSearch({ search: '' });
        faqService.getFaq(0, 100).then(onGetFaqSuccess).catch(onGetFaqError);
    };

    //Delete question
    const onDeleteClick = useCallback((myQuestion) => {
        _logger(myQuestion);

        Swal.fire({
            title: 'Are you sure you wish to Delete this FAQ Record?',
            text: 'This Action Will Permamnently Delete This Record',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                faqService.deleteFaq(myQuestion.id).then(onFaqDeleteSuccess).catch(onFaqDeleteError);
                document.location.reload(true);
            }
        });
    });

    const onFaqDeleteSuccess = () => {
        toastr.success('FAQ was Successfully Deleted');
    };

    const onFaqDeleteError = (err) => {
        toastr.error('FAQ was unsuccessfully Deleted');
        _logger(err);
    };

    //Search bar
    const [search, setSearch] = useState({
        search: '',
    });

    const onSearchChange = (e) => {
        const target = e.currentTarget;
        const newSearchValue = target.value;
        const nameOfField = target.name;
        _logger(target);
        setSearch((prevState) => {
            const newSearchObject = { ...prevState };
            newSearchObject[nameOfField] = newSearchValue;
            return newSearchObject;
        });
    };

    const onSearchClicked = (e) => {
        e.preventDefault();
        faqService.search(0, 10, search.search).then(onSearchSuccuess).catch(onSearchError);
    };

    const onSearchSuccuess = (data) => {
        let listOfFaqs = data.item.pagedItems;
        _logger(listOfFaqs);
        setFaqList((prevState) => {
            const faqNewList = { ...prevState };
            faqNewList.faqs = listOfFaqs;
            faqNewList.arrayOfFaq = listOfFaqs.map(mapFaq);
            return faqNewList;
        });
    };

    const onSearchError = (err) => {
        _logger(err);
    };

    //page navigation
    const navigate = useNavigate();
    const onAddQuestionClick = () => {
        _logger('Submit Question Clicked');
        navigate('/faqs/new');
    };

    const onEditClick = useCallback((myQuestion) => {
        _logger('Edit Question Clicked', myQuestion);
        const updateState = {
            id: myQuestion.id,
            question: myQuestion.question,
            answer: myQuestion.answer,
            categoryId: myQuestion.categoryId,
            sortOrder: myQuestion.sortOrder,
        };
        navigate('/faqs/update', { state: updateState });
    });

    //map FAQ to page
    const mapFaq = (aQuestion) => {
        return (
            <FaqCard
                {...props}
                question={aQuestion}
                key={aQuestion.id}
                handleDelete={onDeleteClick}
                handleEdit={onEditClick}
            />
        );
    };

    return (
        <>
            <Location />
            <section className="py-5">
                <Container>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <h1 className="mt-0">
                                    <i className="mdi mdi-frequently-asked-questions"></i>
                                </h1>
                                <h3 className="">Frequently Asked Questions</h3>
                                <p className="text-muted mt-3">
                                    {' '}
                                    Nisi praesentium similique totam odio obcaecati, reprehenderit, dignissimos rem
                                    temporibus ea inventore alias!
                                    <br /> Beatae animi nemo ea tempora, temporibus laborum facilis ut!
                                </p>

                                <div className="mt-2 row text-center ">
                                    <form className=" search-group form-control-med">
                                        <input
                                            type="text"
                                            name="search"
                                            placeholder="Search..."
                                            className="faqSearch"
                                            onChange={onSearchChange}
                                            value={search.search}
                                        />
                                        <button
                                            style={{ marginLeft: '1mm' }}
                                            variant="secondary"
                                            id="search"
                                            type="submit"
                                            onClick={onSearchClicked}>
                                            Search
                                        </button>
                                        <button
                                            style={{ marginLeft: '1mm' }}
                                            variant="secondary"
                                            onClick={onClearAllClicked}>
                                            Clear search
                                        </button>
                                    </form>
                                </div>

                                {props.currentUser.isLoggedIn && props.currentUser.roles.includes('Admin') && (
                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm mt-2"
                                        onClick={onAddQuestionClick}>
                                        Add Question
                                    </button>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <div className="row">{faqList.arrayOfFaq}</div>
                </Container>
            </section>
        </>
    );
}

export default FAQ;
