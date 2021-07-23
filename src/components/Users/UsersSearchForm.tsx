import React from "react";
import {Field, Form, Formik} from 'formik';
import { FilterType } from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selectors";


const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FriendFormType = "true" | "false" | "null";

type FormType = {
    term: string
    friend: FriendFormType
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: {setSubmitting: (setSubmitting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }

        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}} validate={usersSearchFormValidate} onSubmit={submit}>

            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">Все пользователи</option>
                        <option value="true">Подписанные</option>
                        <option value="false">Не подписанные</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Найти
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})

export default UsersSearchForm