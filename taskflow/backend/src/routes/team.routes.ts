import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  sendInvitationController,
  getTeamMembersController,
  getInvitationsController,
  acceptInvitationController,
  rejectInvitationController,
} from "../controllers/team.controller";

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team member and invitation management APIs
 */

/**
 * @swagger
 * /api/team/invite:
 *   post:
 *     summary: Send a team invitation
 *     description:
 *       Sends a team invitation to an existing TaskFlow user.
 *       The receiver will get an in-app notification.
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       201:
 *         description: Invitation sent successfully
 *       400:
 *         description: Invalid request or invitation already exists
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User with this email does not exist
 */
router.post("/invite", sendInvitationController);

/**
 * @swagger
 * /api/team/members:
 *   get:
 *     summary: Get team members
 *     description:
 *       Returns all users who have accepted the team invitation
 *       with the authenticated user.
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team members fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       member:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: cmabc123xyz
 *                           name:
 *                             type: string
 *                             example: Emaan Abid
 *                           email:
 *                             type: string
 *                             example: emaan@example.com
 *                           avatar:
 *                             type: string
 *                             nullable: true
 *       401:
 *         description: Unauthorized
 */
router.get("/members", getTeamMembersController);

/**
 * @swagger
 * /api/team/invitations:
 *   get:
 *     summary: Get received team invitations
 *     description:
 *       Returns all pending team invitations received by
 *       the authenticated user.
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Invitations fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/invitations", getInvitationsController);

/**
 * @swagger
 * /api/team/invitations/{id}/accept:
 *   patch:
 *     summary: Accept a team invitation
 *     description:
 *       Accepting an invitation creates a mutual team relationship
 *       between sender and receiver.
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrvqf0q4000gma0pgo0xlzun
 *     responses:
 *       200:
 *         description: Invitation accepted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invitation not found
 */
router.patch("/invitations/:id/accept", acceptInvitationController);

/**
 * @swagger
 * /api/team/invitations/{id}/reject:
 *   patch:
 *     summary: Reject a team invitation
 *     description:
 *       Rejects a received team invitation.
 *       The sender will receive a notification.
 *     tags:
 *       - Team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cmrvqf0q4000gma0pgo0xlzun
 *     responses:
 *       200:
 *         description: Invitation rejected successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Invitation not found
 */
router.patch("/invitations/:id/reject", rejectInvitationController);

export default router;