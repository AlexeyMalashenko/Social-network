import React from "react";
import {Field, Form, Formik} from 'formik';
import { FilterType } from "../../redux/users-reducer";


const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {

    const submit = (values: FilterType, {setSubmitting}: {setSubmitting: (setSubmitting: boolean) => void}) => {
        props.onFilterChanged(values)
    }

    return <div>
        <Formik
            initialValues={{term: '', friend: ''}}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                  {/*  <Field type="text" name="friend"/>*/}
                    <button type="submit" disabled={isSubmitting}>
                        Найти
                    </button>
                </Form>
            )}
        </Formik>
    </div>

}

export default UsersSearchForm