import { ImportsMap } from '../types'

export default <ImportsMap>({
  'vee-validate': [
    // https://vee-validate.logaretm.com/v4/guide/composition-api/api-review
    // https://github.com/logaretm/vee-validate/blob/main/packages/vee-validate/src/index.ts
    'validate',
    'defineRule',
    'configure',
    'useField',
    'useForm',
    'useFieldArray',
    'useResetForm',
    'useIsFieldDirty',
    'useIsFieldTouched',
    'useIsFieldValid',
    'useIsSubmitting',
    'useValidateField',
    'useIsFormDirty',
    'useIsFormTouched',
    'useIsFormValid',
    'useValidateForm',
    'useSubmitCount',
    'useFieldValue',
    'useFormValues',
    'useFormErrors',
    'useFieldError',
    'useSubmitForm',
    'FormContextKey',
    'FieldContextKey',
  ],
})
