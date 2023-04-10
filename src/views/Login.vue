<template>
	<form class="card auth-card" @submit.prevent="submitHandler">
		<div class="card-content">
			<span class="card-title">Домашняя бухгалтерия</span>
			<div class="input-field">
				<!-- ($v.email.$dirty && !$v.email.required) Мы что-то вписали -->
				<!-- ($v.email.$dirty && $v.email.email) Это что-то email -->
				<input
						id="email"
						type="text"
						v-model.trip="email"
						:class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
				>
				<label for="email">Email</label>
				<small class="helper-text invalid"
				v-if="$v.email.$dirty && !$v.email.required"
				>Поле Email не должно быть пустым</small>
				<small class="helper-text invalid"
				v-else-if="$v.email.$dirty && !$v.email.email"
				>Не коректный email</small>
			</div>
			<div class="input-field">
				<input
					id="password"
					type="password"
					v-model.trip="password"
					:class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
				>
				<label for="password">Пароль</label>
				<small class="helper-text invalid"
				v-if="$v.password.$dirty && !$v.password.required">
				Введите пароль</small>
				<small class="helper-text invalid"
				v-else-if="$v.password.$dirty && !$v.password.minLength">
				Пароль должен быть длиннее 6 символов</small>
			</div>
		</div>
		<div class="card-action">
			<div>
				<button
					class="btn waves-effect waves-light auth-submit"
					type="submit"
				>
					Войти
					<i class="material-icons right">send</i>
				</button>
			</div>

			<p class="center">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</p>
		</div>
	</form>
</template>

<script>
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
	data: () => ({
		email: '',
		password: ''
	}),
	validations: {
		email: {email, required},
		password: {required, minLength: minLength(6)}
	},
	methods: {
		async submitHandler(){
			// проверка системной переменной котрую мы получаем используя плагин vuelidate
			// находится в состояниии invalid
			if (this.$v.$invalid) {
				// Вызываем метод который позволяет активизировать валидацию
				this.$v.$touch()
				// выходим из метода чтобы дальнейшая логика не вызывалась
				return
			}
			const formData = {
				email: this.email,
				password: this.password
			}
			try {
				await this.$store.dispatch('login', formData)
				this.$router.push('/')
			} catch (e) {}
		}
	}
}
</script>