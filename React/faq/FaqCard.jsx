import React from 'react';
import PropTypes from 'prop-types';
import logger from 'sabio-debug';
const _logger = logger.extend('FaqCard');

function FaqCard(props) {
    _logger(props.currentUser.isLoggedIn);
    _logger(props.currentUser.roles);

    const onDeleteClick = (e) => {
        e.preventDefault();
        props.handleDelete(props.question, e);
    };
    //console.log(aFriend);

    const onEditClick = (e) => {
        e.preventDefault();
        props.handleEdit(props.question, e);
    };

    return (
        <>
            <div className="pt-4 row col-md-6">
                <div className="offset-lg-1">
                    <div>
                        <div className="faq-question-q-box">Q.</div>
                        <h4 className="faq-question">{props.question.question}</h4>
                        <p className="faq-answer mb-3">{props.question.answer}</p>
                    </div>
                    {props.currentUser.isLoggedIn && props.currentUser.roles.includes('Admin') && (
                        <div className="btn-group">
                            <button className="btn btn-primary" onClick={onDeleteClick} style={{ marginLeft: '1mm' }}>
                                Delete FAQ
                            </button>
                            <button className="btn btn-primary" onClick={onEditClick} style={{ marginLeft: '1mm' }}>
                                Edit FAQ
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

FaqCard.propTypes = {
    question: PropTypes.shape({
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
    }),
    currentUser: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
};

export default React.memo(FaqCard);
