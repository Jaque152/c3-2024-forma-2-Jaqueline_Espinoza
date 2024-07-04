import Router from 'koa-router'
import getHealth from './health/health'
import getHistoricalEventsUseCase from '../domain/historical_events/use_cases/getHistoricalEvents'


const router = new Router()

router.get('/health', getHealth)
router.get('/api/history/:ocurrence', getHistoricalEventsUseCase.getHistoricalEventsByOcurrence)
router.get('/api/history/:ocurrence', getHistoricalEventsUseCase.getHistoricalEventsFormat)

export default router
