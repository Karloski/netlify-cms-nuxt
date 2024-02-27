<template>
  <div class="contact flex flex-col flex-auto relative md:static">
    <div class="text-center py-4 relative md:static">
      <h1>
        Contact Me
      </h1>
    </div>
    <div class="flex flex-col flex-auto overflow-auto justify-center items-center py-4">
      <form class="flex flex-col gap-y-6 w-full max-w-lg" @submit.prevent="onSubmit">
        <div v-if="Object.keys(form.errors).length > 0" class="bg-red-700 text-white p-4 rounded">
          <span class="block mb-4">There were some issues with the information you provided</span>
          <ul class="-my-2">
            <li v-for="(value, key) in form.errors" :key="key" class="py-2">
              <span class="capitalize">{{ key }}</span>: {{ value }}
            </li>
          </ul>
        </div>
        <div v-if="form.success.length > 0" class="bg-green-700 text-white p-4 rounded">
          <span>{{ form.success }}</span>
        </div>
        <div class="flex w-full">
          <div class="input-item flex-auto relative">
            <input v-model="form.attributes.name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text">
            <span :class="(form.attributes.name ? 'placeholder-active ' : '' ) + 'placeholder absolute absolute-center-y text-gray-500 p-4'" @click="focus($event.target.previousElementSibling)">
              Name
            </span>
          </div>
        </div>
        <div class="flex w-full">
          <div class="input-item flex-auto relative">
            <input v-model="form.attributes.email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email">
            <span :class="(form.attributes.email ? 'placeholder-active ' : '' ) + 'placeholder absolute absolute-center-y text-gray-500 p-4'" @click="focus($event.target.previousElementSibling)">
              Email
            </span>
          </div>
        </div>
        <div class="flex w-full">
          <div class="input-item flex-auto relative">
            <textarea v-model="form.attributes.msg" class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded p-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none" />
            <span :class="(form.attributes.msg ? 'placeholder-active ' : '' ) + 'placeholder absolute top-0 p-4 text-gray-500'" @click="focus($event.target.previousElementSibling)">
              Message
            </span>
          </div>
        </div>
        <div class="form-submit-group flex justify-center items-center">
          <button class="button text-black p-4 w-full rounded cursor-pointer">
            <font-awesome-icon v-if="form.submitting" class="self-center text-white fa-pulse" icon="spinner" />
            <span v-else>Submit</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  transition: {
    name: 'slide',
    mode: 'out-in'
  },
  layout: 'projection',
  async asyncData ({ context }) {
  },
  data () {
    return {
      form: {
        attributes: {
          name: '',
          email: '',
          msg: ''
        },
        errors: {},
        success: '',
        submitting: false
      }
    }
  },
  methods: {
    focus (dom) {
      dom.focus()
    },
    async onSubmit () {
      try {
        this.form.errors = {}
        this.form.success = ''
        this.form.submitting = true

        await this.$axios.$post('/api/contact', this.form.attributes)

        this.form.success = 'Thanks for getting in touch!'
      } catch (e) {
        if ('response' in e && e.response.data.errors) {
          this.form.errors = e.response.data.errors
        }

        if ('message' in e) {
          this.form.errors['error'] = e.message
        }
      } finally {
        this.form.submitting = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  &-item {
    input, textarea {
      &:focus {
        &+ .placeholder {
          top: 0;
          transform: unset;
          padding: 0.25rem;
          font-size: 0.75rem;

          &.focus\:invisible {
            opacity: 0;
          }
        }
      }
    }

    .placeholder {
      transition: all 0.1s ease;
    }

    .placeholder {
      &-active {
        top: 0;
        transform: unset;
        padding: 0.25rem;
        font-size: 0.75rem;

        &.focus\:invisible {
          opacity: 0;
        }
      }
    }
  }
}
</style>
